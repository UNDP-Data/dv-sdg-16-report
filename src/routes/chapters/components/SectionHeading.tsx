import { H4 } from '@undp/design-system-react/Typography';
import { useInView } from 'motion/react';
import { type ReactNode, useEffect, useRef } from 'react';
import Tag from '@/components/Tag';
import { useActions } from '@/stores/chapterStore';

interface SectionHeadingProps {
  id?: string;
  image?: string;
  imageAlt?: string;
  tag: string;
  heading: string;
  color: 'primary' | 'secondary' | 'tertiary';
  children?: ReactNode;
}

export default function Section({
  id,
  image,
  imageAlt = '',
  tag,
  heading,
  color,
  children,
}: SectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { setActiveSection } = useActions();

  const isInView = useInView(containerRef, {
    margin: '-40% 0px -50% 0px',
  });

  useEffect(() => {
    if (isInView && id) {
      setActiveSection(id);
    }
  }, [isInView, id, setActiveSection]);

  return (
    <section id={id} ref={containerRef} className='flex flex-col gap-4 px-4 py-12 md:px-8 lg:px-16'>
      {image && <img src={image} alt={imageAlt} width={100} />}
      <Tag color={color} content={tag} />
      <H4>{heading}</H4>
      {children}
    </section>
  );
}
