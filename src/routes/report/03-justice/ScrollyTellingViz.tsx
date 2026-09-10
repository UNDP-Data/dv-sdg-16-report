import { H2, P } from '@undp/design-system-react/Typography';
import { animate, motion, useMotionValue, useTransform } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { SCROLLY_GRAPH_PADDING, SCROLLY_NUMBER_AREA_HEIGHT } from '@/constants';
import { generateUniqueRandomPointsArrayWithSpiralInCenter } from '@/Utils/generateUniqueRandomPointsArray';
import { getRadiusForDots } from '@/Utils/getRadiusForDots';
import InfoTooltip from '../components/InfoTooltip';

const SLIDES = [
  {
    vizContent: {
      reportedCount: 0,
      caption: null,
      color: 'gray-400',
      nonReportedDotOpacity: 1,
    },
    slideContent: (
      <>
        Violence is often vastly underreported, with many victims never coming forward and their
        experiences remaining invisible to the authorities.
      </>
    ),
  },
  {
    vizContent: {
      reportedCount: 46,
      caption: null,
      color: 'gray-500',
      nonReportedDotOpacity: 0.4,
    },
    slideContent: (
      <>
        Across countries with{' '}
        <InfoTooltip
          trigger='available data'
          content='As of early 2026, 81 countries had produced at least one data point on reporting of physical, sexual or psychological violence since 2015. Data availability remains uneven across forms of violence. Comparable information is available for 39 countries for robbery and 36 countries for physical assault. Only 19 countries have collected comparable data on sexual assault.'
          color='secondary'
        />
        , the{' '}
        <InfoTooltip
          trigger='median'
          content='The median is the middle value in a set of numbers. It divides the data into two equal halves, with half of observations above it and half below it.'
          color='secondary'
        />{' '}
        reporting rate is below 50%.{' '}
        <span className='font-bold'>Fewer than half of victims of violence report</span> their
        experiences to the police or other competent authorities.
      </>
    ),
  },
  {
    vizContent: {
      reportedCount: 43,
      caption: 'of robberies are reported',
      color: 'categorical-female',
      nonReportedDotOpacity: 0.25,
      noOfCountriesReported: 39,
    },
    slideContent: (
      <>
        <span className='font-bold text-categorical-female'>
          Robbery has the highest median reporting rate
        </span>
      </>
    ),
  },
  {
    vizContent: {
      reportedCount: 39,
      caption: 'of physical assaults are reported',
      color: 'accent-teal-hover',
      nonReportedDotOpacity: 0.25,
      noOfCountriesReported: 36,
    },
    slideContent: (
      <>
        …followed by physical assault.{' '}
        <span className='font-bold text-accent-teal-hover'>
          Four in ten victims of physical assault
        </span>{' '}
        report their experience to the police or other competent authority
      </>
    ),
  },
  {
    vizContent: {
      reportedCount: 17,
      caption: 'of sexual assaults are reported',
      color: 'secondary',
      nonReportedDotOpacity: 0.25,
      noOfCountriesReported: 19,
    },
    slideContent: (
      <>
        <span className='font-bold text-secondary'>
          Sexual assault is the most underreported form of violence.
        </span>{' '}
        Stigma, fear of retaliation, and limited trust in the justice system continue to deter
        victims from seeking justice.
      </>
    ),
  },
];

const MAX_REPORTED_VALUE = Math.max(...SLIDES.map((slide) => slide.vizContent.reportedCount));

export default function ScrollyTellingViz() {
  const [graphRadius, setGraphRadius] = useState(0);
  const [graphWidth, setGraphWidth] = useState(0);
  const [graphHeight, setGraphHeight] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (value) => `${Math.round(value)}`);

  const graphDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0].target.clientWidth || 620;
      const height = entries[0].target.clientHeight || 480;
      setGraphWidth(width);
      setGraphHeight(height);
      setGraphRadius(
        Math.max(
          0,
          Math.min(width / 2 - SCROLLY_GRAPH_PADDING, height / 2 - SCROLLY_NUMBER_AREA_HEIGHT),
        ),
      );
    });
    if (graphDiv.current) {
      resizeObserver.observe(graphDiv.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  const dotsList = useMemo(
    () =>
      graphWidth && graphHeight && graphRadius
        ? generateUniqueRandomPointsArrayWithSpiralInCenter(
            100,
            graphRadius,
            Math.max(60, graphRadius / 3),
            MAX_REPORTED_VALUE,
            graphWidth,
            graphHeight,
            getRadiusForDots(graphRadius),
          )
        : [],
    [graphWidth, graphHeight, graphRadius],
  );
  const activeSlide = SLIDES[activeSlideIndex] ?? SLIDES[0];
  useEffect(() => {
    animate(count, activeSlide.vizContent.reportedCount, { duration: 0.5, ease: 'easeOut' });
  }, [activeSlide, count]);

  return (
    <div className='relative mx-auto flex w-full flex-col justify-between gap-x-10 gap-y-0 px-4 lg:flex-row'>
      <div
        aria-hidden
        className='pointer-events-none absolute top-0 bottom-0 left-1/2 -z-20 w-full -translate-x-1/2'
      >
        <div
          className='sticky top-0 h-screen w-full bg-cover bg-top-right bg-no-repeat'
          style={{
            backgroundImage: "url('/imgs/report/scrolly-bg.webp')",
            maskImage:
              'linear-gradient(to bottom, transparent 0, black 25vh, black 75vh, transparent 100vh)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0, black 25vh, black 75vh, transparent 100vh)',
          }}
        />
      </div>
      <div className='mx-auto flex w-full max-w-7xl flex-col justify-between gap-x-10 gap-y-0 px-4 lg:flex-row'>
        <div
          className='sticky top-11 -z-10 mx-auto flex h-[calc(100dvh-2.75rem)] w-full max-w-180 flex-col items-center justify-center py-6'
          ref={graphDiv}
        >
          <motion.svg
            width={`${graphWidth}px`}
            height={`${graphHeight}px`}
            viewBox={`0 0 ${graphWidth} ${graphHeight}`}
            className='mx-auto'
          >
            <g id='individual-dots'>
              {dotsList.map((dot) => {
                const isReported = dot.id < activeSlide.vizContent.reportedCount;

                return (
                  <motion.circle
                    key={dot.id}
                    r={getRadiusForDots(graphRadius)}
                    initial={{
                      cx: dot.x,
                      cy: dot.y,
                      fill: `var(--${activeSlide.vizContent.color})`,
                      opacity: 1,
                    }}
                    animate={{
                      cx: isReported ? dot.xSpiral : dot.x,
                      cy: isReported ? dot.ySpiral : dot.y,
                      fill: `var(--${activeSlide.vizContent.color})`,
                      opacity: isReported ? 1 : activeSlide.vizContent.nonReportedDotOpacity,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                );
              })}
            </g>

            <circle
              cx={graphWidth / 2}
              cy={graphHeight / 2}
              r={Math.max(60, graphRadius / 3)}
              className='fill-none stroke-2 stroke-gray-500'
              strokeDasharray='2 8'
              strokeLinecap='round'
            />
            <motion.g
              animate={{ opacity: activeSlideIndex === 0 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <foreignObject
                x={graphWidth / 2 - Math.max(60, graphRadius / 3)}
                y={graphHeight / 2 - Math.max(60, graphRadius / 3)}
                width={Math.max(60, graphRadius / 3) * 2}
                height={Math.max(60, graphRadius / 3) * 2}
              >
                <div className='flex h-full w-full items-center justify-center px-4 text-center text-gray-500 text-sm leading-sm'>
                  only reported cases enter here
                </div>
              </foreignObject>
            </motion.g>

            <motion.g
              animate={{ opacity: activeSlide.vizContent.caption ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <foreignObject
                x={0}
                y={graphHeight - SCROLLY_GRAPH_PADDING - SCROLLY_NUMBER_AREA_HEIGHT}
                width={graphWidth}
                height={SCROLLY_NUMBER_AREA_HEIGHT}
              >
                <div className='flex h-full w-full flex-col justify-center leading-xs'>
                  <H2
                    weight='medium'
                    marginBottom='none'
                    className='text-center font-heading'
                    style={{ color: `var(--${activeSlide.vizContent.color})` }}
                  >
                    <motion.span>{rounded}</motion.span>
                    <span className='ml-1 text-2xl md:text-3xl'>%</span>
                  </H2>
                  <P marginBottom='none' size='xl' className='mt-0.5 text-center text-foreground'>
                    {activeSlide.vizContent.caption}
                  </P>
                  <P marginBottom='none' size='sm' className='text-center text-gray-500'>
                    median across {activeSlide.vizContent.noOfCountriesReported} countries with data
                  </P>
                </div>
              </foreignObject>
            </motion.g>

            {dotsList.length > 0 ? (
              <g id='dot-annotation'>
                <line
                  x1={dotsList[dotsList.length - 1].x}
                  y1={dotsList[dotsList.length - 1].y - getRadiusForDots(graphRadius) - 2}
                  x2={dotsList[dotsList.length - 1].x}
                  y2={dotsList[dotsList.length - 1].y - getRadiusForDots(graphRadius) - 24}
                  className='stroke-1 stroke-gray-400'
                />
                <foreignObject
                  x={0}
                  y={dotsList[dotsList.length - 1].y - getRadiusForDots(graphRadius) - 64}
                  width={graphWidth}
                  height={SCROLLY_NUMBER_AREA_HEIGHT}
                >
                  <P
                    marginBottom='none'
                    size='sm'
                    decoration='italic'
                    className='text-center text-gray-500'
                  >
                    1 dot represents 1% of cases
                    <br />
                    not a fixed number of victims
                  </P>
                </foreignObject>
              </g>
            ) : null}
          </motion.svg>
        </div>
        <div className='mx-auto w-full max-w-100 shrink-0'>
          {SLIDES.map((slide, index) => (
            <div
              className='flex min-h-screen items-center px-4 md:px-0'
              // biome-ignore lint/suspicious/noArrayIndexKey:index can be used because key is static
              key={index}
            >
              <motion.div
                className='my-6 w-full bg-background/80 px-6 py-4 text-xl md:text-3xl lg:bg-transparent'
                onViewportEnter={() => setActiveSlideIndex(index)}
                viewport={{ amount: 0.5 }}
              >
                {slide.slideContent}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
