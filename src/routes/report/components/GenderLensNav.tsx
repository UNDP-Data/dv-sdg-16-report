import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@undp/design-system-react/Tooltip';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useIsGenderLensActive } from '@/stores/chapterStore';

const getInsightTops = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const blocks = new Set(
    Array.from(document.querySelectorAll<HTMLElement>('.gender-lens'), (el) =>
      el.tagName === 'DIV' ? el : (el.closest('div') ?? el),
    ),
  );
  return Array.from(blocks, (block) =>
    Math.min(maxScroll, Math.max(0, window.scrollY + block.getBoundingClientRect().top - 140)),
  );
};

const readCanGo = () => {
  const tops = getInsightTops();
  return {
    up: tops.some((top) => top < window.scrollY - 10),
    down: tops.some((top) => top > window.scrollY + 10),
  };
};

export default function GenderLensNav() {
  const active = useIsGenderLensActive();
  const [canGo, setCanGo] = useState({ up: false, down: false });

  useEffect(() => {
    document.body.classList.toggle('gender-lens-mode', active);
    if (!active) return undefined;
    const update = () => setCanGo(readCanGo());
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      document.body.classList.remove('gender-lens-mode');
    };
  }, [active]);

  if (!active) return null;

  const goTo = (direction: 'up' | 'down') => {
    const tops = getInsightTops();
    const top =
      direction === 'down'
        ? tops.find((t) => t > window.scrollY + 10)
        : [...tops].reverse().find((t) => t < window.scrollY - 10);
    if (top === undefined) return;
    window.scrollTo({ top });
    window.setTimeout(() => setCanGo(readCanGo()), 700);
  };

  return (
    <TooltipProvider delayDuration={100} skipDelayDuration={0}>
      <Tooltip disableHoverableContent>
        <TooltipTrigger asChild>
          <div className='fixed top-1/2 right-6 z-20 flex -translate-y-1/2 flex-col items-center gap-2.5 rounded-full bg-[#ece9fc] px-3 py-4 shadow-[0_2px_8px_#7b6fe82e,0_1px_3px_#7b6fe81a] transition-shadow hover:shadow-[0_4px_12px_#7b6fe842,0_2px_4px_#7b6fe824] md:right-12'>
            <button
              type='button'
              onClick={() => goTo('up')}
              disabled={!canGo.up}
              aria-label='Previous gender insight'
              className='cursor-pointer text-quaternary transition-transform enabled:hover:-translate-y-0.5 disabled:cursor-default disabled:opacity-30'
            >
              <ChevronUp size={20} aria-hidden='true' />
            </button>
            <span className='h-px w-5 bg-quaternary/40' />
            <button
              type='button'
              onClick={() => goTo('down')}
              disabled={!canGo.down}
              aria-label='Next gender insight'
              className='cursor-pointer text-quaternary transition-transform enabled:hover:translate-y-0.5 disabled:cursor-default disabled:opacity-30'
            >
              <ChevronDown size={20} aria-hidden='true' />
            </button>
          </div>
        </TooltipTrigger>
        <TooltipContent
          side='left'
          sideOffset={16}
          className='z-5 border-0 bg-transparent p-0 text-right font-semibold text-quaternary'
        >
          <span className='rounded-sm bg-white box-decoration-clone px-1'>
            Browse
            <br />
            gender-lens
            <br />
            insights
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
