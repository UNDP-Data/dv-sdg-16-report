import { H2, P } from '@undp/design-system-react/Typography';
import { animate, motion, useMotionValue, useTransform } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { generateDotPositionsArray } from './generateDotPositionsArray';

const TOTAL_DOTS = 100;
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
  slideContent: React.ReactNode;
}

const SLIDES: Slide[] = [
  {
    reportedCount: 0,
    caption: null,
    color: 'secondary',
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
    reportedCount: 43,
    caption: 'of robbery is reported',
    color: 'categorical-female',
    slideContent: (
      <>
        <p className='mb-4 last:mb-0'>
          Victims’ decisions to report vary considerably depending on the type of violence they
          experience.
        </p>
        <p className='mb-4 last:mb-0'>
          <span className='font-bold text-categorical-female'>
            Robbery has the highest reporting rate.
          </span>{' '}
          Even so, fewer than half of victims report the crime to the authorities.
        </p>
      </>
    ),
  },
  {
    reportedCount: 39,
    caption: 'of physical assault is reported',
    color: 'accent-teal-hover',
    slideContent: (
      <>
        <span className='font-bold text-accent-teal-hover'>Fewer than four in ten victims</span>{' '}
        report physical assault to the police or another competent authority.
      </>
    ),
  },
  {
    reportedCount: 17,
    caption: 'of sexual violence is reported',
    color: 'secondary',
    slideContent: (
      <>
        <span className='font-bold text-secondary'>
          Sexual violence is far less likely to be reported
        </span>{' '}
        than physical assault or robbery. Stigma, fear of retaliation and lack of trust can prevent
        victims from coming forward.
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
            TOTAL_DOTS,
            {
              centerX: layout.centerX,
              centerY: layout.centerY,
              innerRadius: layout.cloudInnerRadius,
              outerRadius: layout.cloudRadius,
            },
            {
              centerX: layout.centerX,
              centerY: layout.centerY,
              radius: layout.packRadius,
              capacity: MAX_REPORTED,
            },
            layout.dotRadius,
          )
        : [],
    [graphWidth, graphHeight, layout],
  );

  const annotatedDot = useMemo(
    () => dotsList.filter((dot) => dot.id >= MAX_REPORTED).sort((a, b) => a.cloudY - b.cloudY)[0],
    [dotsList],
  );

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
          className='sticky top-0 h-screen w-full bg-cover bg-right-top bg-no-repeat'
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
                  initial={{ cx: dot.cloudX, cy: dot.cloudY, fill: 'var(--gray-400)' }}
                  animate={{
                    cx: isReported ? dot.reportedX : dot.cloudX,
                    cy: isReported ? dot.reportedY : dot.cloudY,
                    fill: isReported ? `var(--${activeSlide.color})` : 'var(--gray-400)',
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
            animate={{ opacity: activeSlide.caption ? 0 : 1 }}
            transition={{ duration: 0.4 }}
          >
            <foreignObject
              x={layout.centerX - layout.targetRadius}
              y={layout.centerY - layout.targetRadius}
              width={layout.targetRadius * 2}
              height={layout.targetRadius * 2}
            >
              <div className='flex h-full w-full items-center justify-center text-center text-gray-500 text-sm leading-sm'>
                only reported cases enter here
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
              </div>
            </foreignObject>
          </motion.g>

          {annotatedDot ? (
            <g id='dot-annotation'>
              <line
                x1={annotatedDot.cloudX}
                y1={annotatedDot.cloudY - layout.dotRadius - 2}
                x2={annotatedDot.cloudX}
                y2={annotatedDot.cloudY - layout.dotRadius - LINE_LENGTH}
                className='stroke-[1px] stroke-gray-400'
              />
              <text
                x={annotatedDot.cloudX}
                y={annotatedDot.cloudY - layout.dotRadius - LINE_LENGTH - 8}
                textAnchor='middle'
                className='fill-gray-500 text-sm italic'
              >
                1 dot represents 1% of victims
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
