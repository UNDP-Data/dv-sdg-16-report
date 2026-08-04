import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useGenderLensStore } from '../stores/genderLens';

const CURRENT_CLASS = 'gender-lens-current';
const NOT_STARTED = -1;

export default function GenderLensNav() {
  const active = useGenderLensStore((s) => s.active);
  const [elements, setElements] = useState<HTMLElement[]>([]);
  const [index, setIndex] = useState(NOT_STARTED);

  useEffect(() => {
    document.body.classList.toggle('gender-lens-mode', active);
  }, [active]);

  useEffect(() => {
    if (!active) return undefined;
    const found = Array.from(document.querySelectorAll<HTMLElement>('.gender-lens'));
    setElements(found);
    setIndex(NOT_STARTED);
    return () => {
      for (const el of found) el.classList.remove(CURRENT_CLASS);
    };
  }, [active]);

  useEffect(() => {
    if (elements.length === 0) return undefined;
    for (const el of elements) el.classList.remove(CURRENT_CLASS);
    if (index !== NOT_STARTED) elements[index]?.classList.add(CURRENT_CLASS);
    return () => {
      elements[index]?.classList.remove(CURRENT_CLASS);
    };
  }, [elements, index]);

  if (!active || elements.length === 0) return null;

  const goTo = (nextIndex: number) => {
    setIndex(nextIndex);
    elements[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const hasStarted = index !== NOT_STARTED;
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
    <div className='fixed bottom-8 left-1/2 z-20 flex animate-[gender-nav-in_350ms_cubic-bezier(0.16,1,0.3,1)_forwards] items-center gap-4 rounded-full border border-white/20 bg-[#0b1830] px-3 py-2 text-white shadow-lg'>
      <button
        type='button'
        onClick={goPrev}
        disabled={isFirst}
        aria-label='Previous gender insight'
        className='flex h-8 w-8 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:border-white/10 disabled:text-white/30 disabled:hover:bg-transparent'
      >
        <ChevronLeft size={16} />
      </button>
      {hasStarted ? (
        <span className='text-sm'>
          Gender insight {index + 1} of {elements.length}
        </span>
      ) : (
        <span className='text-sm'>
          {elements.length} gender insight{elements.length === 1 ? '' : 's'} available
        </span>
      )}
      <button
        type='button'
        onClick={goNext}
        disabled={isLast}
        aria-label='Next gender insight'
        className='flex h-8 w-8 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:border-white/10 disabled:text-white/30 disabled:hover:bg-transparent'
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
