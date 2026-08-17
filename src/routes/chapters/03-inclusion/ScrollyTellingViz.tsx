import { animate, motion, useMotionValue, useTransform } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { generateUniqueRandomPointsArray } from './generateUniqueRandomPointsArray';

const REGIONS = [
  {
    region: 'Sub-Saharan Africa',
    unregisteredBirths: 90,
  },
  {
    region: 'Central and South Asia',
    unregisteredBirths: 42,
  },
  {
    region: 'North Africa and West Asia',
    unregisteredBirths: 8,
  },
  {
    region: 'Eastern and South-Eastern Asia',
    unregisteredBirths: 7,
  },
  {
    region: 'Latin America and the Caribbean',
    unregisteredBirths: 2,
  },
  {
    region: 'Oceania (excld. Australia and New Zealand)',
    unregisteredBirths: 1,
  },
];

const NO_OF_BIRTHS = 652;
const NO_OF_UNREGISTERED_BIRTHS = REGIONS.reduce(
  (sum, { unregisteredBirths }) => sum + unregisteredBirths,
  0,
);
const NO_OF_REGISTERED_BIRTHS = NO_OF_BIRTHS - NO_OF_UNREGISTERED_BIRTHS;

const DOT_RADIUS = 7.5;
const CIRCLE_PADDING = 50;

const SLIDES = [
  {
    vizContent: {
      registeredCircleOpacity: 1,
      unRegisteredCircleOpacity: 1,
      registeredCircleColor: 'var(--surface-lg)',
      unRegisteredCircleColor: 'var(--surface-lg)',
      keyNumber: NO_OF_BIRTHS,
      category: 'total children under the age of 5',
      xCoordinateSuffix: 'x',
      yCoordinateSuffix: 'y',
      keyTextOpacity: 1,
      regionLabelOpacity: 0,
    },
    slideContent: (
      <>
        Around <span className='font-bold text-surface-lg'>652 million</span> children under the age
        of 5 are part of the global population.
      </>
    ),
    color: 'surface-lg',
  },
  {
    vizContent: {
      registeredCircleOpacity: 1,
      unRegisteredCircleOpacity: 0.5,
      registeredCircleColor: 'var(--tertiary)',
      unRegisteredCircleColor: 'var(--surface-lg)',
      keyNumber: NO_OF_REGISTERED_BIRTHS,
      category: 'total registered children under the age of 5',
      xCoordinateSuffix: 'x',
      yCoordinateSuffix: 'y',
      keyTextOpacity: 1,
      regionLabelOpacity: 0,
    },
    slideContent: (
      <>
        Today, nearly <span className='font-bold'>8 in 10 children</span>, more than{' '}
        <span className='font-bold text-tertiary'>500 million children</span>, have had their births
        registered. This represents significant global progress and an important achievement.
      </>
    ),
    color: 'tertiary',
  },
  {
    vizContent: {
      registeredCircleOpacity: 0.5,
      unRegisteredCircleOpacity: 1,
      registeredCircleColor: 'var(--surface-lg)',
      unRegisteredCircleColor: 'var(--error)',
      keyNumber: NO_OF_UNREGISTERED_BIRTHS,
      category: 'total unregistered children under the age of 5',
      xCoordinateSuffix: 'x',
      yCoordinateSuffix: 'y',
      keyTextOpacity: 1,
      regionLabelOpacity: 0,
    },
    slideContent: (
      <>
        Yet, progress has slowed over the past decade, and an estimated{' '}
        <span className='font-bold text-error'>150 million children</span> remain unregistered.
      </>
    ),
    color: 'error',
  },
  {
    vizContent: {
      registeredCircleOpacity: 0.5,
      unRegisteredCircleOpacity: 1,
      registeredCircleColor: 'var(--surface-lg)',
      unRegisteredCircleColor: 'var(--error)',
      keyNumber: NO_OF_UNREGISTERED_BIRTHS,
      category: '',
      xCoordinateSuffix: 'regionX',
      yCoordinateSuffix: 'regionY',
      keyTextOpacity: 0,
      regionLabelOpacity: 1,
    },
    slideContent: (
      <>More than half of the world’s unregistered children live in Sub-Saharan Africa</>
    ),
    color: 'surface-lg',
  },
];

export default function ScrollyTellingViz() {
  const [graphRadius, setGraphRadius] = useState(0);
  const [graphWidth, setGraphWidth] = useState(0);
  const [graphHeight, setGraphHeight] = useState(0);

  const count = useMotionValue(0);

  const rounded = useTransform(count, (value) => `~ ${Math.round(value).toLocaleString()} million`);

  const [activeSlideIndex, setActiveSlideIndex] = useState(-1);

  const graphDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      setGraphRadius(
        (Math.min(
          ...[entries[0].target.clientWidth || 620, entries[0].target.clientHeight || 480],
        ) || 420) /
          2 -
          CIRCLE_PADDING,
      );
      setGraphWidth(entries[0].target.clientWidth || 620);
      setGraphHeight(entries[0].target.clientHeight || 480);
    });
    if (graphDiv.current) {
      resizeObserver.observe(graphDiv.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  const dotsList = useMemo(
    () =>
      graphRadius && graphWidth && graphHeight
        ? generateUniqueRandomPointsArray(
            NO_OF_BIRTHS,
            graphRadius,
            graphWidth,
            graphHeight,
            NO_OF_UNREGISTERED_BIRTHS,
            REGIONS,
            DOT_RADIUS,
          )
        : [...Array(NO_OF_BIRTHS).keys()].map((i) => ({
            id: i,
            x: 0,
            y: 0,
            regionX: 0,
            regionY: 0,
            registered: i >= NO_OF_UNREGISTERED_BIRTHS,
            color: i >= NO_OF_UNREGISTERED_BIRTHS ? 'var(--tertiary)' : 'var(--error)',
            distanceFromCenter: 0,
          })),
    [graphRadius, graphHeight, graphWidth],
  );

  useEffect(() => {
    if (activeSlideIndex > -1 && activeSlideIndex < SLIDES.length) {
      animate(count, SLIDES[activeSlideIndex].vizContent.keyNumber, {
        duration: 0.5,
        ease: 'easeOut',
      });
    }
  }, [activeSlideIndex, count]);
  const activeSlide = SLIDES[activeSlideIndex] ?? SLIDES[0];

  return (
    <div className='relative left-1/2 mx-auto flex w-screen max-w-320 -translate-x-1/2 items-start justify-center gap-16 px-6'>
      <div
        className='sticky top-11 flex h-[calc(100vh-2.75rem)] w-full max-w-180 flex-col items-center justify-center py-10'
        ref={graphDiv}
      >
        <motion.svg
          width={`${graphWidth}px`}
          height={`${graphHeight}px`}
          viewBox={`0 0 ${graphWidth} ${graphHeight}`}
          className='mx-auto'
        >
          <g id='individual-dots'>
            {dotsList.map((dot) => (
              <motion.circle
                key={dot.id}
                id={`dot-${dot.id}`}
                r={DOT_RADIUS}
                strokeWidth={1}
                fillOpacity={0.5}
                initial={{
                  cx: 0,
                  cy: 0,
                  fill: 'var(--surface-lg)',
                  stroke: 'var(--surface-lg)',
                  opacity: 0,
                }}
                animate={{
                  cx: dot[`${activeSlide.vizContent.xCoordinateSuffix as 'x' | 'regionX'}`],
                  cy: dot[`${activeSlide.vizContent.yCoordinateSuffix as 'y' | 'regionY'}`],
                  fill: dot.registered
                    ? activeSlide.vizContent.registeredCircleColor
                    : activeSlide.vizContent.unRegisteredCircleColor,
                  stroke: dot.registered
                    ? activeSlide.vizContent.registeredCircleColor
                    : activeSlide.vizContent.unRegisteredCircleColor,
                  opacity:
                    activeSlideIndex === 3
                      ? dot.registered
                        ? 0
                        : 1
                      : dot.registered
                        ? activeSlide.vizContent.registeredCircleOpacity
                        : activeSlide.vizContent.unRegisteredCircleOpacity,
                }}
                transition={{
                  duration: 0.5,
                }}
              />
            ))}
          </g>
          <motion.text
            x={graphWidth / 2}
            y={graphHeight / 2 + graphRadius + CIRCLE_PADDING}
            dy={20}
            initial={{ fill: 'var(--surface-lg)', opacity: 0 }}
            animate={{
              fill: `var(--${activeSlide.color})`,
              opacity: activeSlide.vizContent.keyTextOpacity,
            }}
            exit={{ fill: 'var(--surface-lg)', opacity: 0 }}
            transition={{
              duration: 0.5,
            }}
            dominantBaseline='central'
            textAnchor='middle'
            className='font-bold font-heading text-[56px] leading-0'
          >
            {rounded}
          </motion.text>
          <motion.g
            animate={{
              opacity: activeSlide.vizContent.regionLabelOpacity,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.5,
            }}
          >
            {REGIONS.map((region, i) => (
              <foreignObject
                key={region.region}
                x={0}
                y={(i * graphHeight) / REGIONS.length}
                width={graphWidth}
                height={40}
              >
                <div className='font-foreground text-2xl'>
                  {region.region}:{' '}
                  <span className='font-bold text-error'>~{region.unregisteredBirths} mil</span>
                </div>
              </foreignObject>
            ))}
          </motion.g>
          <text
            x={graphWidth / 2}
            y={graphHeight / 2 + graphRadius + CIRCLE_PADDING}
            dominantBaseline='central'
            textAnchor='middle'
            className='fill-content-placeholder text-xl leading-0'
            dy={62}
          >
            {activeSlide.vizContent.category}
          </text>
          <text
            x={graphWidth / 2}
            y={graphHeight}
            dominantBaseline='central'
            textAnchor='middle'
            className='fill-content-placeholder text-sm italic leading-0'
            dy={-20}
          >
            1 dot represents 1 million children
          </text>
        </motion.svg>
      </div>
      <div className='w-full max-w-100 shrink-0'>
        {SLIDES.map((slide, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey:index can be used because key is static
          <div className='flex min-h-screen items-center' key={index}>
            <motion.div
              className='my-6 box-border w-full border-tertiary border-l-6 bg-background/80 py-4 pl-6 text-3xl'
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
