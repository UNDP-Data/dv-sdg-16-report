import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@undp/design-system-react/Tooltip';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > window.innerHeight);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <TooltipProvider delayDuration={100} skipDelayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type='button'
            aria-label='Scroll to top'
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className='fixed bottom-6 left-6 z-50 flex size-11 cursor-pointer items-center justify-center rounded-full bg-background text-blue-500 shadow-[0_2px_8px_rgba(43,115,182,0.18),0_1px_3px_rgba(43,115,182,0.10)] transition-shadow hover:shadow-[0_4px_12px_rgba(43,115,182,0.26),0_2px_4px_rgba(43,115,182,0.14)]'
          >
            <ArrowUp size={20} aria-hidden='true' />
          </button>
        </TooltipTrigger>
        <TooltipContent
          side='right'
          className='border-0 bg-transparent p-3 font-semibold text-blue-500'
        >
          Scroll to top
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
