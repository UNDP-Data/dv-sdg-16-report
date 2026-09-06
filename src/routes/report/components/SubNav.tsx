import { Button } from '@undp/design-system-react/Button';
import { cn } from '@undp/design-system-react/cn';
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
import { useActions, useActiveSection, useIsGenderLensActive } from '@/stores/chapterStore';
import type { ChapterSectionDataType } from '@/types';

interface SubNavProps {
  chapterTitle: string;
  /** Small eyebrow shown before the title, e.g. "Chapter". Omit for pages that are not chapters. */
  label?: string;
  showGenderLens?: boolean;
  subsections: ChapterSectionDataType[];
}

export default function SubNav({
  chapterTitle,
  label,
  showGenderLens = true,
  subsections,
}: SubNavProps) {
  const { setIsGenderLensActive } = useActions();
  const isGenderLensActive = useIsGenderLensActive();
  const activeSection = useActiveSection();
  const activeSubsection = subsections.find((subsection) => subsection.anchor === activeSection);

  return (
    <div
      className='sticky top-0 z-30 flex h-11 items-center justify-between border-background/30 border-b bg-cover bg-foreground-soft px-6 py-3 md:px-12'
      style={{ backgroundImage: "url('/imgs/paper-texture.webp')" }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger className='flex min-w-0 items-baseline gap-2 text-content-reverse text-sm'>
          {label ? (
            <span className='shrink-0 text-content-reverse/50 text-xs uppercase tracking-[0.12em]'>
              {label}
            </span>
          ) : null}
          <span className='shrink-0'>{chapterTitle}</span>
          {activeSubsection ? (
            <span className='hidden min-w-0 items-baseline gap-2 md:flex'>
              <span className='text-content-tertiary'>–</span>
              <span className='truncate text-content-tertiary'>{activeSubsection.title}</span>
            </span>
          ) : null}
          <ChevronDown size={14} className='shrink-0 self-center text-content-reverse' />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='start'
          sideOffset={8}
          collisionPadding={16}
          className='undp-scrollbar max-h-[calc(100svh-5rem)] w-[calc(100vw-3rem)] max-w-80 overflow-y-auto border border-background/15 bg-foreground-soft p-3 text-content-reverse shadow-xl'
        >
          {subsections.map((subsection) => (
            <DropdownMenuItem
              key={subsection.anchor}
              asChild
              className='cursor-pointer px-3 py-3 text-content-reverse text-sm hover:bg-background/8! focus:bg-background/8'
            >
              <a href={`#${subsection.anchor}`}>{subsection.title}</a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <TooltipProvider delayDuration={100} skipDelayDuration={0}>
        <div className={cn('flex items-center gap-2', !showGenderLens && 'hidden')}>
          <P marginBottom='none' size='sm' className='text-content-reverse'>
            Gender-lens
          </P>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='icon' type='button' className='p-0 text-content-reverse'>
                <Info size={14} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Highlights gender-disaggregated data where available.</TooltipContent>
          </Tooltip>
          <Switch
            checked={isGenderLensActive}
            onCheckedChange={setIsGenderLensActive}
            size='small'
            showIcon={false}
            color='quaternary'
          />
        </div>
      </TooltipProvider>
    </div>
  );
}
