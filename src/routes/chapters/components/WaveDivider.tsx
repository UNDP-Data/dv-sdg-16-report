export default function WaveDivider({
  src,
  align = 'left',
}: {
  src: string;
  align?: 'left' | 'right';
}) {
  return (
    <div
      aria-hidden='true'
      className={`flex h-55 w-full overflow-hidden ${align === 'right' ? 'justify-end' : 'justify-start'}`}
    >
      <img
        src={src}
        alt='section divider'
        className='h-full w-full max-w-200 object-cover object-center'
      />
    </div>
  );
}
