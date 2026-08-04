import { H1, P } from '@undp/design-system-react/Typography';
import { useEffect, useState } from 'react';
import { useGenderLensStore } from '../../stores/genderLens';
import type { ChapterSection } from './ChapterSubNav';

interface ChapterHeroProps {
  chapterNumber: string;
  title: string;
  intro: string;
  bg: string;
  color?: string;
  subsections: ChapterSection[];
}

export default function ChapterHero({
  chapterNumber,
  title,
  intro,
  bg,
  color,
  subsections,
}: ChapterHeroProps) {
  const genderLensActive = useGenderLensStore((s) => s.active);
  const [genderLensAnchors, setGenderLensAnchors] = useState<Set<string>>(new Set());

  // Detect which subsections contain .gender-lens content further down the page,
  // so their hero card can be highlighted without duplicating that flag in data.
  useEffect(() => {
    if (!genderLensActive) {
      setGenderLensAnchors(new Set());
      return;
    }
    const matches = new Set<string>();
    for (const subsection of subsections) {
      if (document.getElementById(subsection.anchor)?.querySelector('.gender-lens')) {
        matches.add(subsection.anchor);
      }
    }
    setGenderLensAnchors(matches);
  }, [genderLensActive, subsections]);

  return (
    <section
      className='relative flex min-h-[80vh] flex-col items-start gap-4 bg-center bg-cover px-6 py-12 md:px-12 lg:px-24'
      style={{ backgroundImage: `url('${bg}')` }}
    >
      <div className='flex items-center gap-3 text-gray-300'>
        <P
          marginBottom='none'
          size='sm'
          className='font-semibold uppercase tracking-wide'
          style={{ color }}
        >
          Chapter {chapterNumber}
        </P>
        {genderLensActive ? (
          <span
            className='rounded-full border px-2 font-semibold text-xs uppercase tracking-wide'
            style={{ color: 'rgb(123, 111, 232)', borderColor: 'rgb(123, 111, 232)' }}
          >
            With a gender lens
          </span>
        ) : null}
      </div>
      <H1 marginBottom='sm' className='mt-4 font-normal text-9xl! text-white normal-case'>
        {title}
      </H1>
      <P size='lg' className='max-w-3xl text-gray-300'>
        {intro}
      </P>
      <div className='mt-8 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4'>
        {subsections.map((subsection) => (
          <a
            key={subsection.anchor}
            href={`#${subsection.anchor}`}
            className={`rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-colors hover:bg-white/10 ${
              genderLensAnchors.has(subsection.anchor) ? 'gender-lens-match' : ''
            }`}
          >
            {subsection.indicatorCode ? (
              <P marginBottom='2xs' size='sm' weight='semibold' style={{ color }}>
                {subsection.indicatorCode}
              </P>
            ) : null}
            <P marginBottom='none' size='sm' className='text-gray-200'>
              {subsection.heading}
            </P>
          </a>
        ))}
      </div>
    </section>
  );
}
