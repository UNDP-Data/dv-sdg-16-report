import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@undp/design-system-react/DropdownMenu';
import { Switch } from '@undp/design-system-react/Switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@undp/design-system-react/Tooltip';
import { P } from '@undp/design-system-react/Typography';
import { ChevronDown, Info } from 'lucide-react';
import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import { DARK_BLUE, GENDER_LENS_COLOR } from '../../constants';
import { useGenderLensStore } from '../../stores/genderLens';
import type { ChapterSection } from '../../types';

interface ChapterSubNavProps {
  chapterNumber: string;
  chapterTitle: string;
  color?: string;
  subsections: ChapterSection[];
}

export default function ChapterSubNav({
  chapterNumber,
  chapterTitle,
  color,
  subsections,
}: ChapterSubNavProps) {
  const [activeAnchor, setActiveAnchor] = useState<string | undefined>(subsections[0]?.anchor);
  const genderLens = useGenderLensStore((s) => s.active);
  const toggleGenderLens = useGenderLensStore((s) => s.toggle);

  useEffect(() => {
    const elements = subsections
      .map((s) => document.getElementById(s.anchor))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveAnchor(visible.target.id);
      },
      { rootMargin: '-40% 0px -50% 0px' },
    );
    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [subsections]);

  return (
    <div
      className='sticky top-0 z-30 flex items-center justify-between border-gray-800 border-b px-6 py-3 md:px-12'
      style={{ backgroundColor: DARK_BLUE }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger className='flex items-center gap-2 text-sm'>
          <span className='font-semibold' style={{ color }}>
            {chapterNumber}
          </span>
          <span className='text-white'>{chapterTitle}</span>
          <ChevronDown size={14} className='text-gray-400' />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='start'
          className='w-100 border-white/10 bg-[#010C19] text-white'
        >
          {subsections.map((subsection) => {
            const isActive = subsection.anchor === activeAnchor;
            return (
              <DropdownMenuItem
                key={subsection.anchor}
                asChild
                className='focus:bg-white/10 focus:font-normal'
              >
                <a
                  href={`#${subsection.anchor}`}
                  className={`flex items-baseline gap-3 border-l-2 py-3 pl-2 ${
                    isActive ? 'text-white' : 'text-gray-300'
                  }`}
                  style={{ borderColor: isActive ? color : 'transparent' }}
                >
                  <span className='pr-1 pl-2 text-gray-500 text-xs'>{subsection.number}</span>
                  <span className='text-sm'>{subsection.title}</span>
                </a>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      <TooltipProvider delayDuration={100} skipDelayDuration={0}>
        <div className='flex items-center gap-2'>
          <P marginBottom='none' size='sm' className='text-gray-300'>
            Gender-lens
          </P>
          <Tooltip>
            <TooltipTrigger asChild>
              <button type='button' className='text-gray-500'>
                <Info size={14} />
              </button>
            </TooltipTrigger>
            <TooltipContent>Highlights gender-disaggregated data where available.</TooltipContent>
          </Tooltip>
          <Switch
            checked={genderLens}
            onCheckedChange={toggleGenderLens}
            size='small'
            showIcon={false}
            color='custom'
            style={{ '--custom-color-600': GENDER_LENS_COLOR } as CSSProperties}
          />
        </div>
      </TooltipProvider>
    </div>
  );
}
