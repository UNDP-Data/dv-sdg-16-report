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
import type { ChapterSection } from '@/types';

interface SubNavProps {
  chapterNumber: number;
  chapterTitle: string;
  color?: 'primary' | 'secondary' | 'tertiary';
  subsections: ChapterSection[];
}

export default function SubNav({
  chapterNumber,
  chapterTitle,
  color = 'primary',
  subsections,
}: SubNavProps) {
  const { setIsGenderLensActive } = useActions();
  const isGenderLensActive = useIsGenderLensActive();
  const activeSection = useActiveSection();

  return (
    <div
      className='sticky top-0 z-30 flex items-center justify-between border-background/30 border-b bg-cover bg-foreground-soft px-6 py-3 md:px-12'
      style={{ backgroundImage: "url('/imgs/paper-texture.webp')" }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger className='flex items-center gap-2 text-content-reverse text-sm'>
          <P
            weight='semibold'
            size='xs'
            marginBottom='none'
            className={
              color === 'primary'
                ? 'text-primary'
                : color === 'secondary'
                  ? 'text-secondary'
                  : 'text-tertiary'
            }
          >
            {chapterNumber}
          </P>
          {chapterTitle}
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
                    'flex cursor-pointer items-baseline gap-3 border-transparent border-l-2 py-3 pl-2 text-sm hover:bg-background/30!',
                    isActive ? 'text-content-reverse' : 'text-content-tertiary',
                    color === 'primary' && isActive && 'border-primary',
                    color === 'secondary' && isActive && 'border-secondary',
                    color === 'tertiary' && isActive && 'border-tertiary',
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
        <div className='flex items-center gap-2'>
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
