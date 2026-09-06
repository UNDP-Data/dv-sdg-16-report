import { Button } from '@undp/design-system-react/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useIsGenderLensActive } from '@/stores/chapterStore';

export default function GenderLensNav() {
  const active = useIsGenderLensActive();
  const [elements, setElements] = useState<HTMLElement[]>([]);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    document.body.classList.toggle('gender-lens-mode', active);
  }, [active]);

  useEffect(() => {
    if (!active) return undefined;
    const found = Array.from(document.querySelectorAll<HTMLElement>('.gender-lens'));
    setElements(found);
    setIndex(-1);
    return () => {
      for (const el of found) el.classList.remove('gender-lens-current');
    };
  }, [active]);

  useEffect(() => {
    if (elements.length === 0) return undefined;
    for (const el of elements) el.classList.remove('gender-lens-current');
    if (index !== -1) elements[index]?.classList.add('gender-lens-current');
    return () => {
      elements[index]?.classList.remove('gender-lens-current');
    };
  }, [elements, index]);

  if (!active || elements.length === 0) return null;

  const goTo = (nextIndex: number) => {
    setIndex(nextIndex);
    elements[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const hasStarted = index !== -1;
  const isFirst = !hasStarted;
  const isLast = hasStarted && index === elements.length - 1;

  const goPrev = () => {
    if (!isFirst) goTo(index - 1);
  };
  const goNext = () => {
    if (!hasStarted) goTo(0);
    else if (!isLast) goTo(index + 1);
  };

  return (
    <div className='fixed bottom-8 left-1/2 z-20 flex items-center gap-4 rounded-full border border-background/20 bg-foreground-soft px-3 py-2 text-foreground'>
      <Button
        type='button'
        variant='icon'
        onClick={goPrev}
        disabled={isFirst}
        aria-label='Previous gender insight'
        className='flex h-8 w-8 items-center justify-center rounded-full border border-background/30 p-0 text-content-reverse transition-colors hover:bg-background/10 disabled:cursor-not-allowed disabled:border-background/10 disabled:opacity-disabled disabled:hover:bg-transparent'
      >
        <ChevronLeft size={16} />
      </Button>
      <span className='text-content-reverse text-sm'>
        {hasStarted
          ? `Gender insight ${index + 1} of ${elements.length}`
          : `${elements.length} gender insight${elements.length === 1 ? '' : 's'} available`}
      </span>
      <Button
        type='button'
        variant='icon'
        onClick={goNext}
        disabled={isLast}
        aria-label='Next gender insight'
        className='flex h-8 w-8 items-center justify-center rounded-full border border-background/30 p-0 text-content-reverse transition-colors hover:bg-background/10 disabled:cursor-not-allowed disabled:border-background/10 disabled:opacity-disabled disabled:hover:bg-transparent'
      >
        <ChevronRight size={16} />
      </Button>
    </div>
  );
}
