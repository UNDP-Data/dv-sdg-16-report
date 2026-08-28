import { Link } from '@tanstack/react-router';
import { cn } from '@undp/design-system-react/cn';
import { Spacer } from '@undp/design-system-react/Spacer';
import { H2, P } from '@undp/design-system-react/Typography';
import { ArrowRight } from 'lucide-react';
import type { SectionColorType } from '@/types';

interface ChapterFooterProps {
  label: string;
  title: string;
  to: string;
  color: SectionColorType;
}

export default function ChapterFooter({ label, title, to, color }: ChapterFooterProps) {
  return (
    <Link
      to={to}
      className='group flex items-center justify-between bg-foreground-soft px-6 py-8 md:px-12 md:py-16'
    >
      <div>
        <P
          marginBottom='none'
          size='xs'
          weight='semibold'
          className='text-primary uppercase tracking-widest'
        >
          {label}
        </P>
        <Spacer size='base' />
        <H2 marginBottom='none' className='font-heading font-normal text-content-reverse'>
          {title}
        </H2>
      </div>
      <ArrowRight
        size={32}
        className={cn(
          'shrink-0 transition-transform',
          color === 'primary' && 'text-primary',
          color === 'secondary' && 'text-secondary',
          color === 'tertiary' && 'text-tertiary',
          color === 'default' && 'text-blue-600',
          'group-hover:translate-x-2',
        )}
      />
    </Link>
  );
}
