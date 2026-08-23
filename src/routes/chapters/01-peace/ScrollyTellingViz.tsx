import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getArc } from '@/Utils/getArc';

const DOT_RADIUS = 10;
const TRACK_GAP = 24;
const TRACK_THICKNESS_SCALING_FACTOR = 1;
const CIRCLE_PADDING = 5;

const NUM_OF_MIN_FOR_ONE_VICTIM = 14;

const NUM_OF_VICTIMS_ONE_DAY = 102;
const NUM_OF_VICTIMS_ONE_YEAR = 37163;
const NUM_OF_CHILDREN_VICTIMS_ONE_YEAR = 7377;
const NUM_OF_FEMALE_VICTIMS_ONE_YEAR = 6657;

const NUM_OF_VICTIMS_WA_NA = 24156;
const NUM_OF_VICTIMS_SSA = 8919;
const NUM_OF_VICTIMS_WA_NA_SSA = NUM_OF_VICTIMS_WA_NA + NUM_OF_VICTIMS_SSA;

const SLIDES = [
  {
    vizContent: {
      keyNumber: 1,
      time: `${NUM_OF_MIN_FOR_ONE_VICTIM} mins`,
      category: 'documented civilian deaths',
      backgroundTrackPathLength: 0,
      animatedTrackPathLength: 0,
      showFirstDot: true,
      showIndividualDots: false,
    },
    slideContent: (
      <>
        In 2025, a civilian was killed{' '}
        <span className='font-bold text-primary'>every 14 minutes</span>
      </>
    ),
    color: 'primary',
  },
  {
    vizContent: {
      keyNumber: NUM_OF_VICTIMS_ONE_DAY,
      time: '1 day',
      category: 'documented civilian deaths',
      backgroundTrackPathLength: 0,
      animatedTrackPathLength: 0,
      showFirstDot: true,
      showIndividualDots: true,
    },
    slideContent: (
      <>
        Over the course of a single day, this amounted to around{' '}
        <span className='font-bold text-primary'>102 documented civilian deaths</span>, underscoring
        the staggering human toll of violence.
      </>
    ),
    color: 'primary',
  },
  {
    vizContent: {
      keyNumber: NUM_OF_VICTIMS_ONE_YEAR,
      time: '2025',
      category: 'documented civilian deaths',
      backgroundTrackPathLength: 1,
      animatedTrackPathLength: 1,
      showFirstDot: false,
      showIndividualDots: true,
    },
    slideContent: (
      <>
        In 2025, a total of <span className='font-bold text-primary'>37,163 civilian deaths</span>{' '}
        were documented. The status of more than 13,000 deaths in 2025 remained unverified.
      </>
    ),
    color: 'primary',
  },
  {
    vizContent: {
      keyNumber: NUM_OF_CHILDREN_VICTIMS_ONE_YEAR,
      time: '2025',
      category: 'children victims',
      backgroundTrackPathLength: 1,
      animatedTrackPathLength: NUM_OF_CHILDREN_VICTIMS_ONE_YEAR / NUM_OF_VICTIMS_ONE_YEAR,
      showFirstDot: false,
      showIndividualDots: false,
    },
    slideContent: (
      <>
        Children accounted for{' '}
        <span className='py-3 font-bold text-categorical-child leading-none'>
          1 in 5 recorded civilian deaths (20%).
        </span>
        Among child victims, three boys were killed for every two girls.
      </>
    ),
    color: 'categorical-child',
  },
  {
    vizContent: {
      keyNumber: NUM_OF_FEMALE_VICTIMS_ONE_YEAR,
      time: '2025',
      category: 'female victims',
      backgroundTrackPathLength: 1,
      animatedTrackPathLength: NUM_OF_FEMALE_VICTIMS_ONE_YEAR / NUM_OF_VICTIMS_ONE_YEAR,
      showFirstDot: false,
      showIndividualDots: false,
    },
    slideContent: (
      <>
        Women made up{' '}
        <span className='font-bold text-categorical-female'>
          18% of documented civilian deaths.
        </span>{' '}
        Combined, women and children accounted for more than a third (38%) of all civilian
        fatalities.
      </>
    ),
    color: 'categorical-female',
  },
  {
    vizContent: {
      keyNumber: NUM_OF_VICTIMS_WA_NA_SSA,
      time: '2025',
      category: 'victims in Northern Africa and Western Asia, and in Sub-Saharan Africa',
      backgroundTrackPathLength: 1,
      animatedTrackPathLength: NUM_OF_VICTIMS_WA_NA_SSA / NUM_OF_VICTIMS_ONE_YEAR,
      showFirstDot: false,
      showIndividualDots: false,
    },
    slideContent: (
      <>
        Northern Africa and Western Asia accounted for{' '}
        <span className='font-bold text-accent-teal-hover'>
          65% of all documented civilian deaths
        </span>
        , while Sub-Saharan Africa accounted for a{' '}
        <span className='font-bold text-accent-teal-hover'>further 24%</span> — together, almost 9
        in 10 documented civilian deaths.
      </>
    ),
    color: 'accent-teal',
  },
];

export default function ScrollyTellingViz() {
  const [graphRadius, setGraphRadius] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(-1);

  const graphDiv = useRef<HTMLDivElement>(null);

  const count = useMotionValue(1);

  const rounded = useTransform(count, (value) => Math.round(value).toLocaleString());

  useEffect(() => {
    if (activeSlideIndex > -1 && activeSlideIndex < SLIDES.length) {
      animate(count, SLIDES[activeSlideIndex].vizContent.keyNumber, {
        duration: 1,
        ease: 'easeOut',
      });
    }
  }, [activeSlideIndex, count]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      setGraphRadius(
        (Math.min(
          ...[entries[0].target.clientWidth || 620, entries[0].target.clientHeight || 480],
        ) || 420) /
          2 -
          CIRCLE_PADDING,
      );
    });
    if (graphDiv.current) {
      resizeObserver.observe(graphDiv.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  const activeSlide = SLIDES[activeSlideIndex] ?? SLIDES[0];

  const arcDefinition = useMemo(() => {
    return getArc(0, 0, graphRadius - TRACK_GAP / 2, -Math.PI / 2, 1.5 * Math.PI);
  }, [graphRadius]);

  const individualCircleDefinition = useMemo(() => {
    return [...Array(NUM_OF_VICTIMS_ONE_DAY).keys()].map((i) => ({
      id: i,
      x:
        0 +
        (graphRadius - TRACK_GAP / 2) *
          Math.cos((i / NUM_OF_VICTIMS_ONE_DAY) * 2 * Math.PI - Math.PI / 2),
      y:
        0 +
        (graphRadius - TRACK_GAP / 2) *
          Math.sin((i / NUM_OF_VICTIMS_ONE_DAY) * 2 * Math.PI - Math.PI / 2),
      animationDelay: i === 0 ? 1 : (i - 1) * (1 / (NUM_OF_VICTIMS_ONE_DAY - 1)),
    }));
  }, [graphRadius]);

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
        className='sticky top-11 -z-10 flex h-[calc(100vh-2.75rem)] w-full max-w-180 flex-col items-center justify-center'
        ref={graphDiv}
      >
        <motion.svg
          width={`${(graphRadius + CIRCLE_PADDING) * 2}px`}
          height={`${(graphRadius + CIRCLE_PADDING) * 2}px`}
          viewBox={`0 0 ${(graphRadius + CIRCLE_PADDING) * 2} ${(graphRadius + CIRCLE_PADDING) * 2}`}
          className='mx-auto'
        >
          <motion.g
            transform={`translate(${graphRadius + CIRCLE_PADDING}, ${graphRadius + CIRCLE_PADDING})`}
          >
            <g id='track-outline'>
              <circle
                cx={0}
                cy={0}
                r={graphRadius}
                className='fill-none stroke-[1px] stroke-gray-400'
              />
              <circle
                cx={0}
                cy={0}
                r={graphRadius - TRACK_GAP}
                className='fill-none stroke-[1px] stroke-gray-400'
              />
            </g>
            <motion.circle
              id='light-track'
              cx={0}
              cy={0}
              r={graphRadius - TRACK_GAP / 2}
              className='fill-none stroke-gray-200'
              strokeWidth={TRACK_GAP}
              initial={{ opacity: 0 }}
              animate={{ opacity: activeSlide.vizContent.backgroundTrackPathLength }}
              transition={{ duration: 1 }}
            />
            <g id='individual-dots'>
              {individualCircleDefinition.map((dot) => (
                <motion.circle
                  key={dot.id}
                  cx={dot.x}
                  cy={dot.y}
                  r={DOT_RADIUS}
                  className='fill-primary'
                  animate={{
                    opacity:
                      activeSlide.vizContent.showIndividualDots ||
                      (activeSlide.vizContent.showFirstDot && dot.id === 0)
                        ? 1
                        : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: activeSlide.vizContent.showIndividualDots ? dot.animationDelay : 0,
                  }}
                />
              ))}
            </g>
            <motion.path
              id='animated-track'
              initial={{
                pathLength: 0,
                stroke: 'var(--primary)',
                opacity: 0,
              }}
              animate={{
                pathLength: activeSlide.vizContent.animatedTrackPathLength,
                stroke: `var(--${activeSlide.color})`,
                opacity: activeSlide.vizContent.animatedTrackPathLength > 0 ? 1 : 0,
              }}
              transition={{
                pathLength: {
                  duration: 1,
                },
                stroke: {
                  duration: 1,
                },
                opacity: {
                  duration: 0.3,
                },
              }}
              strokeWidth={TRACK_GAP * TRACK_THICKNESS_SCALING_FACTOR}
              strokeLinecap='round'
              d={arcDefinition}
              style={{
                fill: 'none',
              }}
            />
            <motion.g
              transform={`translate(-${graphRadius - TRACK_GAP},-${graphRadius - TRACK_GAP})`}
              id='center-text'
            >
              <foreignObject
                x={0}
                y={0}
                width={(graphRadius - TRACK_GAP) * 2}
                height={(graphRadius - TRACK_GAP) * 2}
              >
                <div className='flex h-full w-full flex-col justify-center gap-1'>
                  <AnimatePresence mode='wait'>
                    {activeSlide.vizContent.time && (
                      <motion.div
                        key={activeSlide.vizContent.time}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='mb-2 fill-content-placeholder text-center text-base text-foreground leading-sm md:text-xl lg:text-2xl'
                      >
                        {activeSlide.vizContent.time}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <motion.div
                    initial={{ color: 'var(--primary)' }}
                    animate={{
                      color: `var(--${activeSlide.color})`,
                    }}
                    exit={{ color: 'var(--primary)' }}
                    transition={{
                      duration: 1,
                    }}
                    className='mt-1 text-center font-heading font-semibold text-[32px] leading-sm md:text-[64px] lg:text-[104px]'
                  >
                    {rounded}
                  </motion.div>
                  {activeSlide.vizContent.category && (
                    <div className='mx-auto flex min-h-[2lh] w-[50%] items-center justify-center fill-content-placeholder text-center text-base text-foreground leading-sm md:text-2xl'>
                      {activeSlide.vizContent.category}
                    </div>
                  )}
                </div>
              </foreignObject>
            </motion.g>
          </motion.g>
        </motion.svg>
      </div>
      <div className='mx-auto w-full max-w-100 shrink-0'>
        {SLIDES.map((slide, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey:index can be used because key is static
          <div className='flex min-h-screen items-center px-4 md:px-0' key={index}>
            <motion.div
              className='my-6 w-full bg-background py-4 pl-6 text-xl md:text-3xl'
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
