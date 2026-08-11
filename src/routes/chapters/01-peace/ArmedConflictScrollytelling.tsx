import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { getArc } from '@/Utils/getArc';

const DOT_RADIUS = 10;
const TRACK_GAP = 30;
const TRACK_THICKNESS_SCALING_FACTOR = 1;
const CIRCLE_PADDING = 45;

const NUM_OF_MIN_FOR_ONE_VICTIM = 14;

const NUM_OF_VICTIMS_ONE_DAY = 102;
const NUM_OF_VICTIMS_ONE_YEAR = 37163;
const NUM_OF_CHILDREN_VICTIMS_ONE_YEAR = 7377;
const NUM_OF_FEMALE_VICTIMS_ONE_YEAR = 6657;
const NUM_OF_MALE_VICTIMS_ONE_YEAR = 23129;

const NUM_OF_VICTIMS_WA_NA = 24156;
const NUM_OF_VICTIMS_SSA = 8919;

export default function ArmedConflictScrollytelling() {
  const [graphRadius, setGraphRadius] = useState(0);

  const graphDiv = useRef<HTMLDivElement>(null);
  const refSlide1 = useRef(null);
  const refSlide2 = useRef(null);
  const refSlide3 = useRef(null);
  const refSlide4 = useRef(null);
  const refSlide5 = useRef(null);
  const refSlide6 = useRef(null);
  const refSlide7 = useRef(null);
  const refSlide8 = useRef(null);

  const slideOneIsInView = useInView(refSlide1, {
    once: false,
    amount: 0.5,
  });
  const slideTwoIsInView = useInView(refSlide2, {
    once: false,
    amount: 0.5,
  });
  const slideThreeIsInView = useInView(refSlide3, {
    once: false,
    amount: 0.5,
  });
  const slideFourIsInView = useInView(refSlide4, {
    once: false,
    amount: 0.5,
  });
  const slideFiveIsInView = useInView(refSlide5, {
    once: false,
    amount: 0.5,
  });
  const slideSixIsInView = useInView(refSlide6, {
    once: false,
    amount: 0.5,
  });
  const slideSevenIsInView = useInView(refSlide7, {
    once: false,
    amount: 0.5,
  });
  const slideEightIsInView = useInView(refSlide8, {
    once: false,
    amount: 0.5,
  });

  const count = useMotionValue(0);

  const rounded = useTransform(count, (value) => Math.round(value).toLocaleString());

  useEffect(() => {
    animate(
      count,
      slideThreeIsInView
        ? NUM_OF_VICTIMS_ONE_YEAR
        : slideTwoIsInView
          ? NUM_OF_VICTIMS_ONE_DAY
          : slideOneIsInView
            ? 1
            : slideFourIsInView
              ? NUM_OF_CHILDREN_VICTIMS_ONE_YEAR
              : slideFiveIsInView
                ? NUM_OF_FEMALE_VICTIMS_ONE_YEAR
                : slideSixIsInView
                  ? NUM_OF_MALE_VICTIMS_ONE_YEAR
                  : slideSevenIsInView
                    ? NUM_OF_VICTIMS_WA_NA
                    : slideEightIsInView
                      ? NUM_OF_VICTIMS_SSA
                      : 0,
      {
        duration: 1,
        ease: 'easeOut',
      },
    );
  }, [
    slideOneIsInView,
    slideTwoIsInView,
    slideThreeIsInView,
    slideFourIsInView,
    slideFiveIsInView,
    slideSixIsInView,
    slideSevenIsInView,
    slideEightIsInView,
    count,
  ]);

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

  const text = slideOneIsInView
    ? `${NUM_OF_MIN_FOR_ONE_VICTIM} mins`
    : slideTwoIsInView
      ? '1 day'
      : '2025';

  const descText =
    slideOneIsInView || slideTwoIsInView || slideThreeIsInView
      ? 'documented civilian deaths'
      : slideFourIsInView
        ? 'children victims'
        : slideFiveIsInView
          ? 'female victims'
          : slideSixIsInView
            ? 'male victims'
            : slideSevenIsInView
              ? 'victims in West Asia and North Africa'
              : 'victims in Sub-Saharan Africa';

  return (
    <div className='relative w-full'>
      <div
        className='sticky top-11 mx-auto flex h-[calc(100vh-2.75rem)] w-full max-w-180 flex-col items-center justify-center'
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
            <motion.circle
              cx={0}
              cy={0}
              r={graphRadius}
              className='fill-none stroke-[1px] stroke-surface-xl'
            />
            <motion.circle
              cx={0}
              cy={0}
              r={graphRadius - TRACK_GAP}
              className='fill-none stroke-[1px] stroke-surface-xl'
            />
            <g>
              <motion.circle
                cx={0}
                cy={-(graphRadius - TRACK_GAP / 2)}
                r={DOT_RADIUS}
                className='fill-primary'
                animate={{
                  opacity: slideOneIsInView || slideTwoIsInView || slideThreeIsInView ? 1 : 0,
                }}
                transition={{
                  duration: 0.3,
                }}
              />
              {[...Array(NUM_OF_VICTIMS_ONE_DAY - 1).keys()].map((i) => (
                <motion.circle
                  key={i}
                  cx={
                    0 +
                    (graphRadius - TRACK_GAP / 2) *
                      Math.cos(((i + 1) / NUM_OF_VICTIMS_ONE_DAY) * 2 * Math.PI - Math.PI / 2)
                  }
                  cy={
                    0 +
                    (graphRadius - TRACK_GAP / 2) *
                      Math.sin(((i + 1) / NUM_OF_VICTIMS_ONE_DAY) * 2 * Math.PI - Math.PI / 2)
                  }
                  r={DOT_RADIUS}
                  className='fill-primary'
                  animate={{
                    opacity: slideTwoIsInView || slideThreeIsInView ? 1 : 0,
                  }}
                  transition={{
                    duration: 1 / (NUM_OF_VICTIMS_ONE_DAY - 1),
                    delay: slideTwoIsInView ? i * (1 / (NUM_OF_VICTIMS_ONE_DAY - 1)) : 0,
                  }}
                />
              ))}
            </g>
            <motion.path
              initial={{
                pathLength: 0,
                opacity: 1,
                stroke: 'var(--primary)',
              }}
              animate={{
                pathLength:
                  slideThreeIsInView ||
                  slideFourIsInView ||
                  slideFiveIsInView ||
                  slideSixIsInView ||
                  slideSevenIsInView ||
                  slideEightIsInView
                    ? 1
                    : 0,
                opacity:
                  slideFourIsInView ||
                  slideFiveIsInView ||
                  slideSixIsInView ||
                  slideSevenIsInView ||
                  slideEightIsInView
                    ? 0.2
                    : 1,
                stroke:
                  slideSevenIsInView || slideEightIsInView ? 'var(--secondary)' : 'var(--primary)',
              }}
              transition={{
                pathLength: {
                  duration: 1,
                },
                opacity: {
                  duration: 0,
                },
                stroke: {
                  duration: 1,
                },
              }}
              strokeWidth={TRACK_GAP}
              d={getArc(0, 0, graphRadius - TRACK_GAP / 2, -Math.PI / 2, 1.5 * Math.PI)}
              style={{
                fill: 'none',
              }}
            />
            <motion.path
              initial={{
                pathLength: 0,
                opacity: 1,
                stroke: 'var(--primary)',
              }}
              animate={{
                pathLength: slideThreeIsInView
                  ? 1
                  : slideFourIsInView
                    ? NUM_OF_CHILDREN_VICTIMS_ONE_YEAR / NUM_OF_VICTIMS_ONE_YEAR
                    : slideFiveIsInView
                      ? NUM_OF_FEMALE_VICTIMS_ONE_YEAR / NUM_OF_VICTIMS_ONE_YEAR
                      : slideSixIsInView
                        ? NUM_OF_MALE_VICTIMS_ONE_YEAR / NUM_OF_VICTIMS_ONE_YEAR
                        : slideSevenIsInView
                          ? NUM_OF_VICTIMS_WA_NA / NUM_OF_VICTIMS_ONE_YEAR
                          : slideEightIsInView
                            ? NUM_OF_VICTIMS_SSA / NUM_OF_VICTIMS_ONE_YEAR
                            : 0,
                stroke:
                  slideSevenIsInView || slideEightIsInView ? 'var(--secondary)' : 'var(--primary)',
                opacity: 1,
              }}
              transition={{
                pathLength: {
                  duration: 1,
                },
                opacity: {
                  duration: 1,
                },
              }}
              strokeWidth={TRACK_GAP * TRACK_THICKNESS_SCALING_FACTOR}
              d={getArc(0, 0, graphRadius - TRACK_GAP / 2, -Math.PI / 2, 1.5 * Math.PI)}
              style={{
                fill: 'none',
              }}
            />
            <motion.g transform='translate(0,30)'>
              <AnimatePresence mode='wait'>
                {text && (
                  <motion.text
                    key={text}
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
                    {text}
                  </motion.text>
                )}
              </AnimatePresence>
              <motion.text
                x='0'
                y='0'
                initial={{ fill: 'var(--primary)' }}
                animate={{
                  fill:
                    slideSevenIsInView || slideEightIsInView
                      ? 'var(--secondary)'
                      : 'var(--primary)',
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
              {descText && (
                <text
                  x='0'
                  y='0'
                  dominantBaseline='central'
                  textAnchor='middle'
                  className='fill-content-placeholder text-xl leading-0'
                  dy={62}
                >
                  {descText}
                </text>
              )}
            </motion.g>
          </motion.g>
        </motion.svg>
      </div>
      <div className='relative -mt-[calc(100vh-2.75rem)] mr-20 ml-auto w-1/4'>
        <div className='flex min-h-screen items-center'>
          <div
            className='my-6 box-border w-full border-primary border-l-6 bg-background/80 py-4 pl-6 text-3xl'
            ref={refSlide1}
          >
            A civilian was killed every <strong>14 minutes</strong> in monitored armed conflicts in
            2025
          </div>
        </div>

        <div className='flex min-h-screen items-center'>
          <div
            className='my-6 box-border w-full border-primary border-l-6 bg-background/80 py-4 pl-6 text-3xl'
            ref={refSlide2}
          >
            In one day, this adds up to around{' '}
            <span className='font-bold text-primary'>102 documented civilian deaths</span>
          </div>
        </div>

        <div className='flex min-h-screen items-center'>
          <div
            className='my-6 box-border w-full border-primary border-l-6 bg-background/80 py-4 pl-6 text-3xl'
            ref={refSlide3}
          >
            In 2025, at least <span className='font-bold text-primary'>37,163 civilian deaths</span>{' '}
            were documented across 20 monitored armed conflicts.
          </div>
        </div>

        <div className='flex min-h-screen items-center'>
          <div
            className='my-6 box-border w-full border-primary border-l-6 bg-background/80 py-4 pl-6 text-3xl'
            ref={refSlide4}
          >
            Of those, <span className='font-bold text-primary'>one in five</span> recorded civilian
            death was a child (<span className='font-bold text-primary'>20%</span>). Three boys were
            killed for every two girls.
          </div>
        </div>
        <div className='flex min-h-screen items-center'>
          <div
            className='my-6 box-border w-full border-primary border-l-6 bg-background/80 py-4 pl-6 text-3xl'
            ref={refSlide5}
          >
            Females accounted for <span className='font-bold text-primary'>18%</span> of those
            killed.
          </div>
        </div>
        <div className='flex min-h-screen items-center'>
          <div
            className='my-6 box-border w-full border-primary border-l-6 bg-background/80 py-4 pl-6 text-3xl'
            ref={refSlide6}
          >
            And adult males and unknown age and sex accounted for the{' '}
            <span className='font-bold text-primary'>62%</span>.
          </div>
        </div>
        <div className='flex min-h-screen items-center'>
          <div
            className='my-6 box-border w-full border-primary border-l-6 bg-background/80 py-4 pl-6 text-3xl'
            ref={refSlide7}
          >
            Regionally, <strong>Northern Africa and Western Asia</strong> was the worst affected
            region, accounting for <span className='font-bold text-secondary'>65%</span> of all
            documented civilian deaths
          </div>
        </div>
        <div className='flex min-h-screen items-center justify-end'>
          <div
            className='my-6 box-border w-full border-primary border-l-6 bg-background/80 py-4 pl-6 text-3xl'
            ref={refSlide8}
          >
            While <strong>Sub-Saharan Africa</strong> accounted for{' '}
            <span className='font-bold text-secondary'>24%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
