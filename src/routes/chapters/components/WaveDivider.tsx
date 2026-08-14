import { cn } from '@undp/design-system-react/cn';

interface WaveDividerProps {
  src: string;
  align?: 'left' | 'right';
}

export default function WaveDivider({ src, align = 'left' }: WaveDividerProps) {
  return (
    <div
      aria-hidden='true'
      className={cn(
        'relative left-1/2 flex h-[220px] w-screen -translate-x-1/2 overflow-hidden',
        align === 'right' ? 'justify-end' : 'justify-start',
      )}
    >
      <img
        src={src}
        alt=''
        className='h-full w-[50rem] max-w-full object-cover object-center'
      />
    </div>
  );
}
