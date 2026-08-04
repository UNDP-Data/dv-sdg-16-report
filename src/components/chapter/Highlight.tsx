import type { ReactNode } from 'react';
import { FONT_HEADING } from '../../constants';

interface HighlightProps {
  color?: string;
  children: ReactNode;
}

export default function Highlight({ color = '#42A1D8', children }: HighlightProps) {
  return (
    <blockquote
      className='my-2 border-l-4 py-1 pl-6 font-normal text-2xl text-gray-900 leading-snug md:text-3xl'
      style={{ borderColor: color, fontFamily: FONT_HEADING }}
    >
      {children}
    </blockquote>
  );
}
