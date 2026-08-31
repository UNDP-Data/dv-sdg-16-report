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
import type { ChapterSectionDataType, SectionColorType } from '@/types';

interface SubNavProps {
  chapterNumber?: number;
  chapterTitle: string;
  color?: SectionColorType;
  showGenderLens?: boolean;
  subsections: ChapterSectionDataType[];
}

export default function SubNav({
  chapterNumber,
  chapterTitle,
  color = 'primary',
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
        <DropdownMenuTrigger className='flex items-center gap-2 text-content-reverse text-sm'>
          {chapterNumber ? (
            <P
              weight='semibold'
              size='xs'
              marginBottom='none'
              className={cn(
                color === 'primary' && 'text-primary',
                color === 'secondary' && 'text-secondary',
                color === 'tertiary' && 'text-tertiary',
                color === 'default' && 'text-blue-500',
              )}
            >
              {chapterNumber}
            </P>
          ) : null}
          {chapterTitle}
          {activeSubsection ? (
            <>
              <span className='text-content-tertiary'>–</span>
              <span className='text-content-tertiary'>{activeSubsection.title}</span>
            </>
          ) : null}
          <ChevronDown size={14} className='text-content-reverse' />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='start'
          className='w-100 border-background/30 bg-foreground-soft text-content-reverse'
        >
          {subsections.map((subsection) => {
            const isActive = subsection.anchor === activeSection;
            return (
              <DropdownMenuItem key={subsection.anchor} asChild className='focus:bg-foreground/30'>
                <a
                  href={`#${subsection.anchor}`}
                  className={cn(
                    'flex cursor-pointer items-baseline gap-3 border-transparent border-l-2 py-3 pl-2 text-sm transition-colors hover:bg-background/5!',
                    isActive ? 'text-content-reverse' : 'text-content-reverse/80',
                    color === 'primary' && isActive && 'border-primary',
                    color === 'secondary' && isActive && 'border-secondary',
                    color === 'tertiary' && isActive && 'border-tertiary',
                    color === 'default' && isActive && 'border-blue-500',
                  )}
                >
                  <span className='pr-1 pl-2 text-xs'>{subsection.id}</span>
                  {subsection.title}
                </a>
              </DropdownMenuItem>
            );
          })}
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
