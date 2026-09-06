import { cn } from '@undp/design-system-react/cn';
import { Grid } from '@undp/design-system-react/Grid';
import { H1, P } from '@undp/design-system-react/Typography';
import { useInView } from 'motion/react';
import { useEffect, useRef } from 'react';
import { useActions, useIsGenderLensActive } from '@/stores/chapterStore';
import type { ChapterSectionDataType, SectionColorType } from '@/types';

interface HeroBannerProps {
  chapterNumber?: number;
  label?: string;
  title: string;
  intro: React.ReactNode;
  bg: string;
  color?: SectionColorType;
  subsections: ChapterSectionDataType[];
}

export default function HeroBanner({
  chapterNumber,
  label,
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
      className='relative h-auto bg-center bg-cover bg-foreground-soft md:min-h-[calc(100vh-102px)]'
      style={{ backgroundImage: `url('${bg}')` }}
    >
      <div className='mx-auto flex w-full max-w-300 flex-col items-start gap-4 px-6 py-20 md:px-12 md:py-28'>
        <div className='flex items-center gap-3 text-content-reverse'>
          <P
            marginBottom='none'
            size='sm'
            weight='semibold'
            className={cn(
              'uppercase tracking-widest',
              color === 'primary' && 'text-primary',
              color === 'secondary' && 'text-secondary',
              color === 'tertiary' && 'text-tertiary',
              color === 'default' && 'text-blue-500',
            )}
          >
            {label ?? `Chapter ${chapterNumber}`}
          </P>
          {isGenderLensActive ? (
            <P
              weight='semibold'
              marginBottom='none'
              size='xs'
              className='rounded-full border border-quaternary px-2 text-quaternary text-xs uppercase tracking-widest'
            >
              With a gender lens
            </P>
          ) : null}
        </div>
        <H1 marginBottom='none' className='font-normal text-content-reverse normal-case'>
          {title}
        </H1>
        <P size='xl' className='max-w-3xl text-content-reverse'>
          {intro}
        </P>
        <P
          marginBottom='none'
          size='sm'
          className='text-content-secondary uppercase tracking-widest'
        >
          {label ? 'At a glance' : 'Chapter at a glance'}
        </P>
        <Grid noOfCol={{ base: 1, sm: 2, md: 3, lg: 4 }} gap='12px'>
          {subsections.map((subsection) => (
            <a
              key={subsection.anchor}
              href={`#${subsection.anchor}`}
              className={cn(
                'rounded-sm border p-4 backdrop-blur-lg transition-colors',
                isGenderLensActive && subsection.isGenderLens
                  ? 'border-quaternary/50 bg-quaternary/20 hover:bg-quaternary/30'
                  : 'border-background/10 bg-background/1 hover:bg-background/5',
              )}
            >
              {subsection.title ? (
                <P
                  marginBottom='2xs'
                  size='sm'
                  weight='semibold'
                  className={cn(
                    'line-clamp-1',
                    color === 'primary' && 'text-primary',
                    color === 'secondary' && 'text-secondary',
                    color === 'tertiary' && 'text-tertiary',
                    color === 'default' && 'text-blue-500',
                  )}
                >
                  {subsection.indicatorCode ? `${subsection.indicatorCode} – ` : null}
                  {subsection.title}
                </P>
              ) : null}
              <P marginBottom='none' size='base' className='line-clamp-3 text-content-reverse'>
                {subsection.heading}
              </P>
            </a>
          ))}
        </Grid>
      </div>
    </section>
  );
}
