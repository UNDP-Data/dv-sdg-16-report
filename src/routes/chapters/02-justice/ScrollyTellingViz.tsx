import { H2, P } from '@undp/design-system-react/Typography';
import { animate, motion, useMotionValue, useTransform } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import InfoTooltip from '../components/InfoTooltip';
import { generateDotPositionsArray } from './generateDotPositionsArray';

const DOT_RADIUS = 6;
const PADDING = 24;
const BOTTOM_PADDING = 20;
const NUMBER_AREA = 144;
const LINE_LENGTH = 24;
const TARGET_RATIO = 0.3;

interface Slide {
  reportedCount: number;
  caption: string | null;
  color: string;
  cloudOpacity?: number;
  slideContent: React.ReactNode;
}

const SLIDES: Slide[] = [
  {
    reportedCount: 0,
    caption: null,
    color: 'gray-400',
    cloudOpacity: 1,
    slideContent: (
      <>
        <p className='mb-4 last:mb-0'>Violence does not automatically enter the justice system.</p>
        <p className='mb-4 last:mb-0'>
          Whether it is reported determines whether it becomes visible to authorities and can be
          investigated.
        </p>
      </>
    ),
  },
  {
    reportedCount: 46,
    caption: null,
    color: 'gray-500',
    cloudOpacity: 0.4,
    slideContent: (
      <p className='mb-4 last:mb-0'>
        Across countries with{' '}
        <InfoTooltip
          trigger='available data'
          content='As of early 2026, 81 countries had produced at least one data point on reporting of physical, sexual or psychological violence since 2015. Data availability remains uneven across forms of violence. Comparable information is available for 39 countries for robbery and 36 countries for physical assault. Only 19 countries have collected comparable data on sexual assault.'
          color='secondary'
        />
        , <span className='font-bold'>fewer than half of victims of violence report</span> their
        experiences to the police or other competent authorities.
      </p>
    ),
  },
  {
    reportedCount: 43,
    caption: 'of robberies are reported',
    color: 'categorical-female',
    slideContent: (
      <>
        <p className='mb-4 last:mb-0'>
          Victims’ decisions to report vary considerably depending on the type of violence they
          experience.
        </p>
        <p className='mb-4 last:mb-0'>
          <span className='font-bold text-categorical-female'>
            Robbery has the highest median reporting rate.
          </span>{' '}
        </p>
      </>
    ),
  },
  {
    reportedCount: 39,
    caption: 'of physical assaults are reported',
    color: 'accent-teal-hover',
    slideContent: (
      <>
        <span className='font-bold text-accent-teal-hover'>
          Fewer than four in ten victims report physical assault
        </span>{' '}
        to the police or another competent authority.
      </>
    ),
  },
  {
    reportedCount: 17,
    caption: 'of sexual assaults are reported',
    color: 'secondary',
    slideContent: (
      <>
        <span className='font-bold text-secondary'>
          Sexual assault has the lowest reporting rate
        </span>{' '}
        among forms of violence, consistent with the evidence pointing to multiple deterrents to
        reporting, including stigma, fear of retaliation, lack of confidence in the justice system,
        and previous negative experiences with authorities.
      </>
    ),
  },
];

const MAX_REPORTED = Math.max(...SLIDES.map((slide) => slide.reportedCount));

export default function ScrollyTellingViz() {
  const [graphWidth, setGraphWidth] = useState(0);
  const [graphHeight, setGraphHeight] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const count = useMotionValue(0);
  const rounded = useTransform(count, (value) => `${Math.round(value)}`);

  const graphDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      setGraphWidth(entries[0].target.clientWidth || 640);
      setGraphHeight(entries[0].target.clientHeight || 480);
    });
    if (graphDiv.current) {
      resizeObserver.observe(graphDiv.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  const layout = useMemo(() => {
    const numberBandTop = graphHeight - BOTTOM_PADDING - NUMBER_AREA;
    const centerX = graphWidth / 2;
    const centerY = graphHeight / 2;
    const cloudRadius = Math.min(centerX - PADDING, numberBandTop - centerY - 8);
    const targetRadius = Math.max(50, cloudRadius * TARGET_RATIO);

    const packRadius = targetRadius - DOT_RADIUS - 4;
    const dotRadius = Math.min(DOT_RADIUS, packRadius * 0.105);

    return {
      centerX,
      centerY,
      numberBandTop,
      cloudRadius,
      targetRadius,
      packRadius,
      dotRadius,
      cloudInnerRadius: targetRadius + dotRadius + 6,
    };
  }, [graphWidth, graphHeight]);

  const dotsList = useMemo(
    () =>
      graphWidth && graphHeight
        ? generateDotPositionsArray(
            { x: layout.centerX, y: layout.centerY },
            { innerRadius: layout.cloudInnerRadius, outerRadius: layout.cloudRadius },
            { radius: layout.packRadius, capacity: MAX_REPORTED },
            layout.dotRadius,
            {
              x: layout.centerX,
              y: layout.centerY - layout.cloudRadius + layout.dotRadius,
            },
          )
        : [],
    [graphWidth, graphHeight, layout],
  );

  const annotatedDot = dotsList[dotsList.length - 1];

  const activeSlide = SLIDES[activeSlideIndex] ?? SLIDES[0];

  useEffect(() => {
    animate(count, activeSlide.reportedCount, { duration: 0.5, ease: 'easeOut' });
  }, [activeSlide, count]);

  return (
    <div className='relative mx-auto flex w-screen max-w-7xl flex-col justify-between gap-x-10 gap-y-0 px-4 lg:flex-row'>
      <div
        aria-hidden
        className='pointer-events-none absolute top-0 bottom-0 left-1/2 -z-20 w-screen -translate-x-1/2'
      >
        <div
          className='sticky top-0 h-screen w-full bg-cover bg-top-right bg-no-repeat'
          style={{
            backgroundImage: "url('/imgs/scrolly-bg.webp')",
            maskImage:
              'linear-gradient(to bottom, transparent 0, black 25vh, black 75vh, transparent 100vh)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0, black 25vh, black 75vh, transparent 100vh)',
          }}
        />
      </div>
      <div
        className='sticky top-11 -z-10 mx-auto flex h-[calc(100vh-2.75rem)] w-full max-w-180 flex-col items-center justify-center'
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
              const isReported = dot.id < activeSlide.reportedCount;

              return (
                <motion.circle
                  key={dot.id}
                  r={layout.dotRadius}
                  initial={{
                    cx: dot.cloud.x,
                    cy: dot.cloud.y,
                    fill: `var(--${activeSlide.color})`,
                    fillOpacity: activeSlide.cloudOpacity ?? 0.25,
                  }}
                  animate={{
                    cx: isReported ? dot.reported.x : dot.cloud.x,
                    cy: isReported ? dot.reported.y : dot.cloud.y,
                    fill: `var(--${activeSlide.color})`,
                    fillOpacity: isReported ? 1 : (activeSlide.cloudOpacity ?? 0.25),
                  }}
                  transition={{ duration: 0.5 }}
                />
              );
            })}
          </g>

          <circle
            cx={layout.centerX}
            cy={layout.centerY}
            r={layout.targetRadius}
            className='fill-none stroke-[2px] stroke-gray-500'
            strokeDasharray='2 8'
            strokeLinecap='round'
          />
          <motion.g
            animate={{ opacity: activeSlideIndex === 0 ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <foreignObject
              x={layout.centerX - layout.targetRadius}
              y={layout.centerY - layout.targetRadius}
              width={layout.targetRadius * 2}
              height={layout.targetRadius * 2}
            >
              <div className='flex h-full w-full items-center justify-center text-center text-gray-500 text-sm leading-sm'>
                only reported cases
                <br />
                enter here
              </div>
            </foreignObject>
          </motion.g>

          <motion.g
            animate={{ opacity: activeSlide.caption ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <foreignObject x={0} y={layout.numberBandTop} width={graphWidth} height={NUMBER_AREA}>
              <div className='flex h-full w-full flex-col justify-center'>
                <H2
                  weight='medium'
                  marginBottom='none'
                  className='text-center font-heading leading-none'
                  style={{ color: `var(--${activeSlide.color})` }}
                >
                  <motion.span>{rounded}</motion.span>
                  <span className='ml-0.5 text-2xl md:text-3xl'>%</span>
                </H2>
                <P marginBottom='none' size='xl' className='mt-0.5 text-center text-foreground'>
                  {activeSlide.caption}
                </P>
                <P marginBottom='none' size='sm' className='text-center text-gray-500'>
                  median across countries with data
                </P>
              </div>
            </foreignObject>
          </motion.g>

          {annotatedDot ? (
            <g id='dot-annotation'>
              <line
                x1={annotatedDot.cloud.x}
                y1={annotatedDot.cloud.y - layout.dotRadius - 2}
                x2={annotatedDot.cloud.x}
                y2={annotatedDot.cloud.y - layout.dotRadius - LINE_LENGTH}
                className='stroke-[1px] stroke-gray-400'
              />
              <text
                x={annotatedDot.cloud.x}
                y={annotatedDot.cloud.y - layout.dotRadius - LINE_LENGTH - 8}
                textAnchor='middle'
                className='fill-gray-500 text-sm italic'
              >
                <tspan x={annotatedDot.cloud.x} dy='-1em'>
                  1 dot represents 1% of cases
                </tspan>
                <tspan x={annotatedDot.cloud.x} dy='1.3em'>
                  not a fixed number of victims
                </tspan>
              </text>
            </g>
          ) : null}
        </motion.svg>
      </div>
      <div className='w-full max-w-100 shrink-0'>
        {SLIDES.map((slide, index) => (
          <div
            className='flex min-h-screen items-center px-4 md:px-0'
            // biome-ignore lint/suspicious/noArrayIndexKey:index can be used because key is static
            key={index}
          >
            <motion.div
              className='my-6 box-border w-full bg-background/80 py-4 pl-6 text-xl md:text-3xl lg:mix-blend-multiply'
              onViewportEnter={() => setActiveSlideIndex(index)}
              viewport={{ amount: 0.5 }}
            >
              {slide.slideContent}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
