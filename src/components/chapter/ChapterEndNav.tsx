import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { DARK_BLUE, FONT_HEADING } from '../../constants';

interface ChapterEndNavProps {
  label: string;
  title: string;
  to: string;
  color: string;
}

export default function ChapterEndNav({ label, title, to, color }: ChapterEndNavProps) {
  return (
    <Link
      to={to}
      className='group flex items-center justify-between px-6 py-16 md:px-12 md:py-20'
      style={{ backgroundColor: DARK_BLUE }}
    >
      <div>
        <p className='font-semibold text-sm uppercase tracking-wide' style={{ color }}>
          {label}
        </p>
        <p className='mt-2 font-normal text-6xl text-white' style={{ fontFamily: FONT_HEADING }}>
          {title}
        </p>
      </div>
      <ArrowRight
        size={32}
        style={{ color }}
        className='shrink-0 transition-transform group-hover:translate-x-2'
      />
    </Link>
  );
}
