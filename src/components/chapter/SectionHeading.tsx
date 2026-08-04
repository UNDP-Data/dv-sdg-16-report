import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface SectionHeadingProps {
  id?: string;
  image?: string;
  imageAlt?: string;
  icon?: LucideIcon;
  tag: string;
  heading: string;
  color: string;
  children?: ReactNode;
}

export default function Section({
  id,
  image,
  imageAlt = '',
  icon: Icon,
  tag,
  heading,
  color,
  children,
}: SectionHeadingProps) {
  return (
    <section id={id} className='flex flex-col gap-4 px-4 py-12 md:px-8 lg:px-16'>
      {image ? (
        <img src={image} alt={imageAlt} width={100} />
      ) : Icon ? (
        <Icon size={32} strokeWidth={1.25} style={{ color }} />
      ) : null}
      <p className='tag' style={{ color }}>
        {tag}
      </p>
      <h3>{heading}</h3>
      {children}
    </section>
  );
}
