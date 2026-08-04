interface PlaceholderBlockProps {
  label: string;
  title?: string;
}

export default function PlaceholderBlock({ label, title }: PlaceholderBlockProps) {
  return (
    <div className='flex flex-col items-center justify-center gap-1 rounded-md border border-gray-300 border-dashed bg-gray-50 px-4 py-10 text-center'>
      <span className='font-semibold text-gray-400 text-xs uppercase tracking-wide'>{label}</span>
      {title ? <span className='text-gray-500 text-sm'>{title}</span> : null}
    </div>
  );
}
