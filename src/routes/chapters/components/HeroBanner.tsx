import { cn } from '@undp/design-system-react/cn';
import { Grid } from '@undp/design-system-react/Grid';
import { H1, P } from '@undp/design-system-react/Typography';
import { useInView } from 'motion/react';
import { useEffect, useRef } from 'react';
import { useActions, useIsGenderLensActive } from '@/stores/chapterStore';
import type { ChapterSection } from '@/types';

interface HeroBannerProps {
  chapterNumber: number;
  title: string;
  intro: React.ReactNode;
  bg: string;
  color?: 'primary' | 'secondary' | 'tertiary';
  subsections: ChapterSection[];
}

export default function HeroBanner({
  chapterNumber,
  title,
  intro,
  bg,
  color,
  subsections,
}: HeroBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { setActiveSection } = useActions();

  const isInView = useInView(containerRef, {
    margin: '-40% 0px -50% 0px',
  });

  useEffect(() => {
    if (isInView) {
      setActiveSection('banner');
    }
  }, [isInView, setActiveSection]);
  const isGenderLensActive = useIsGenderLensActive();

  return (
    <section
      ref={containerRef}
      className='relative h-[calc(100vh-102px)] bg-center bg-cover'
      style={{ backgroundImage: `url('${bg}')` }}
    >
      <div className='mx-auto flex w-full max-w-300 flex-col items-start gap-4 px-12 py-20 md:py-28'>
        <div className='flex items-center gap-3 text-surface-sm'>
          <P
            marginBottom='none'
            size='sm'
            className={cn(
              'font-semibold uppercase tracking-widest',
              color === 'primary' && 'text-primary',
              color === 'secondary' && 'text-secondary',
              color === 'tertiary' && 'text-tertiary',
            )}
          >
            Chapter {chapterNumber}
          </P>
          {isGenderLensActive ? (
            <span className='rounded-full border border-quaternary px-2 font-semibold text-quaternary text-xs uppercase tracking-widest'>
              With a gender lens
            </span>
          ) : null}
        </div>
        <H1 marginBottom='sm' className='font-normal text-content-reverse normal-case'>
          {title}
        </H1>
        <P size='lg' className='max-w-3xl text-surface-sm'>
          {intro}
        </P>
        <Grid noOfCol={{ base: 1, sm: 2, md: 3, lg: 4 }} gap='12px'>
          {subsections.map((subsection) => (
            <a
              key={subsection.anchor}
              href={`#${subsection.anchor}`}
              className={cn(
                'rounded-lg border p-4 backdrop-blur-sm transition-colors',
                isGenderLensActive && subsection.isGenderLens
                  ? 'border-quaternary/50 bg-quaternary/20 hover:bg-quaternary/30'
                  : 'border-background/10 bg-background/5 hover:bg-background/10',
              )}
            >
              {subsection.indicatorCode ? (
                <P
                  marginBottom='2xs'
                  size='sm'
                  weight='semibold'
                  className={cn(
                    color === 'primary' && 'text-primary',
                    color === 'secondary' && 'text-secondary',
                    color === 'tertiary' && 'text-tertiary',
                  )}
                >
                  {subsection.indicatorCode}
                </P>
              ) : null}
              <P marginBottom='none' size='sm' className='text-content-secondary'>
                {subsection.heading}
              </P>
            </a>
          ))}
        </Grid>
      </div>
    </section>
  );
}
