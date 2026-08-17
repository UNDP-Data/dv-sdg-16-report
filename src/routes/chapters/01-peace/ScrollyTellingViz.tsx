import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getArc } from '@/Utils/getArc';

const DOT_RADIUS = 10;
const TRACK_GAP = 30;
const TRACK_THICKNESS_SCALING_FACTOR = 1;
const CIRCLE_PADDING = 5;

const NUM_OF_MIN_FOR_ONE_VICTIM = 14;

const NUM_OF_VICTIMS_ONE_DAY = 102;
const NUM_OF_VICTIMS_ONE_YEAR = 37163;
const NUM_OF_CHILDREN_VICTIMS_ONE_YEAR = 7377;
const NUM_OF_FEMALE_VICTIMS_ONE_YEAR = 6657;
const NUM_OF_MALE_VICTIMS_ONE_YEAR = 23129;

const NUM_OF_VICTIMS_WA_NA = 24156;
const NUM_OF_VICTIMS_SSA = 8919;

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
        A civilian was killed every <strong>14 minutes</strong> in monitored armed conflicts in 2025
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
        In one day, this adds up to around{' '}
        <span className='font-bold text-primary'>102 documented civilian deaths</span>
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
        In 2025, at least <span className='font-bold text-primary'>37,163 civilian deaths</span>{' '}
        were documented across 20 monitored armed conflicts.
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
        Of those, <span className='font-bold text-primary'>one in five</span> recorded civilian
        death was a child (<span className='font-bold text-primary'>20%</span>). Three boys were
        killed for every two girls.
      </>
    ),
    color: 'primary',
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
        Females accounted for <span className='font-bold text-primary'>18%</span> of those killed.
      </>
    ),
    color: 'primary',
  },
  {
    vizContent: {
      keyNumber: NUM_OF_MALE_VICTIMS_ONE_YEAR,
      time: '2025',
      category: 'male victims',
      backgroundTrackPathLength: 1,
      animatedTrackPathLength: NUM_OF_MALE_VICTIMS_ONE_YEAR / NUM_OF_VICTIMS_ONE_YEAR,
      showFirstDot: false,
      showIndividualDots: false,
    },
    slideContent: (
      <>
        And adult males and unknown age and sex accounted for the{' '}
        <span className='font-bold text-primary'>62%</span>.
      </>
    ),
    color: 'primary',
  },
  {
    vizContent: {
      keyNumber: NUM_OF_VICTIMS_WA_NA,
      time: '2025',
      category: 'victims in West Asia and North Africa',
      backgroundTrackPathLength: 1,
      animatedTrackPathLength: NUM_OF_VICTIMS_WA_NA / NUM_OF_VICTIMS_ONE_YEAR,
      showFirstDot: false,
      showIndividualDots: false,
    },
    slideContent: (
      <>
        Regionally, <strong>Northern Africa and Western Asia</strong> was the worst affected region,
        accounting for <span className='font-bold text-secondary'>65%</span> of all documented
        civilian deaths
      </>
    ),
    color: 'secondary',
  },
  {
    vizContent: {
      keyNumber: NUM_OF_VICTIMS_SSA,
      time: '2025',
      category: 'victims in Sub-Saharan Africa',
      backgroundTrackPathLength: 1,
      animatedTrackPathLength: NUM_OF_VICTIMS_SSA / NUM_OF_VICTIMS_ONE_YEAR,
      showFirstDot: false,
      showIndividualDots: false,
    },
    slideContent: (
      <>
        While <strong>Sub-Saharan Africa</strong> accounted for{' '}
        <span className='font-bold text-secondary'>24%</span>
      </>
    ),
    color: 'secondary',
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
    <div className='relative left-1/2 mx-auto flex w-screen max-w-320 -translate-x-1/2 items-start justify-center gap-16 px-6'>
      <div
        className='sticky top-11 flex h-[calc(100vh-2.75rem)] w-full max-w-180 flex-col items-center justify-center'
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
                className='fill-none stroke-[1px] stroke-surface-xl'
              />
              <circle
                cx={0}
                cy={0}
                r={graphRadius - TRACK_GAP}
                className='fill-none stroke-[1px] stroke-surface-xl'
              />
            </g>
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
              id='background-track'
              opacity={0.2}
              initial={{
                pathLength: 0,
                stroke: 'var(--primary)',
              }}
              animate={{
                pathLength: activeSlide.vizContent.backgroundTrackPathLength,
                stroke: `var(--${activeSlide.color})`,
              }}
              transition={{
                pathLength: {
                  duration: 1,
                },
                stroke: {
                  duration: 1,
                },
              }}
              strokeWidth={TRACK_GAP}
              d={arcDefinition}
              style={{
                fill: 'none',
              }}
            />
            <motion.path
              id='animated-track'
              initial={{
                pathLength: 0,
                stroke: 'var(--primary)',
              }}
              animate={{
                pathLength: activeSlide.vizContent.animatedTrackPathLength,
                stroke: `var(--${activeSlide.color})`,
              }}
              transition={{
                pathLength: {
                  duration: 1,
                },
                stroke: {
                  duration: 1,
                },
              }}
              opacity={1}
              strokeWidth={TRACK_GAP * TRACK_THICKNESS_SCALING_FACTOR}
              d={arcDefinition}
              style={{
                fill: 'none',
              }}
            />
            <motion.g transform='translate(0,30)' id='center-text'>
              <AnimatePresence mode='wait'>
                {activeSlide.vizContent.time && (
                  <motion.text
                    key={activeSlide.vizContent.time}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    x='0'
                    y='0'
                    dominantBaseline='central'
                    textAnchor='middle'
                    className='fill-content-placeholder text-[32px] leading-0'
                    dy={-82}
                  >
                    {activeSlide.vizContent.time}
                  </motion.text>
                )}
              </AnimatePresence>
              <motion.text
                x='0'
                y='0'
                initial={{ fill: 'var(--primary)' }}
                animate={{
                  fill: `var(--${activeSlide.color})`,
                }}
                exit={{ fill: 'var(--primary)' }}
                transition={{
                  duration: 1,
                }}
                dominantBaseline='central'
                textAnchor='middle'
                className='font-bold font-heading text-[104px] leading-0'
              >
                {rounded}
              </motion.text>
              {activeSlide.vizContent.category && (
                <text
                  x='0'
                  y='0'
                  dominantBaseline='central'
                  textAnchor='middle'
                  className='fill-content-placeholder text-xl leading-0'
                  dy={62}
                >
                  {activeSlide.vizContent.category}
                </text>
              )}
            </motion.g>
          </motion.g>
        </motion.svg>
      </div>
      <div className='w-full max-w-100 shrink-0'>
        {SLIDES.map((slide, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey:index can be used because key is static
          <div className='flex min-h-screen items-center' key={index}>
            <motion.div
              className='my-6 box-border w-full border-primary border-l-6 bg-background/80 py-4 pl-6 text-3xl'
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
