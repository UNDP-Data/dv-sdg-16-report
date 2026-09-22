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
    <button
      type='button'
      aria-label='Scroll to top'
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className='fixed bottom-6 left-6 z-40 flex cursor-pointer items-center gap-2 rounded-full border border-blue-500/20 bg-background p-3 text-blue-500 shadow-md transition-shadow hover:shadow-lg md:-translate-x-1/2 md:left-1/2 md:px-5'
    >
      <ArrowUp size={20} aria-hidden='true' />
      <span className='hidden md:inline'>Scroll to top</span>
    </button>
  );
}
