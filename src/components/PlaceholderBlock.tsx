import { P } from '@undp/design-system-react/Typography';

interface PlaceholderBlockProps {
  label: string;
  title?: string;
}

export default function PlaceholderBlock({ label, title }: PlaceholderBlockProps) {
  return (
    <div className='flex flex-col items-center justify-center gap-1 rounded-md border border-gray-300 border-dashed bg-gray-50 px-4 py-10 text-center'>
      <P weight='semibold' size='xs' className='text-gray-400 uppercase tracking-widest'>
        {label}
      </P>
      {title ? <span className='text-gray-500 text-sm'>{title}</span> : null}
    </div>
  );
}
