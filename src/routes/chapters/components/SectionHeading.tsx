import { H4 } from '@undp/design-system-react/Typography';
import { useInView } from 'motion/react';
import { type ReactNode, useEffect, useRef } from 'react';
import Tag from '@/components/Tag';
import { useActions } from '@/stores/chapterStore';

interface SectionHeadingProps {
  id?: string;
  tag: string;
  heading: string;
  color: 'primary' | 'secondary' | 'tertiary';
  children?: ReactNode;
}

export default function Section({ id, tag, heading, color, children }: SectionHeadingProps) {
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
    <section id={id} ref={containerRef} className='flex flex-col gap-4 px-4 md:px-8 lg:px-16'>
      <Tag color={color} content={tag} />
      <H4 marginBottom='none' className='font-heading font-semibold text-foreground'>
        {heading}
      </H4>
      {children}
    </section>
  );
}
