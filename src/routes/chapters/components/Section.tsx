import { H4 } from '@undp/design-system-react/Typography';
import { useInView } from 'motion/react';
import { type ReactNode, useEffect, useRef } from 'react';
import Tag from '@/components/Tag';
import { useActions } from '@/stores/chapterStore';
import { TextContainer } from './Containers';

interface SectionProps {
  id?: string;
  tag: string;
  heading: string;
  color: 'primary' | 'secondary' | 'tertiary';
  children?: ReactNode;
}

export default function Section({ id, tag, heading, color, children }: SectionProps) {
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
    <section id={id} ref={containerRef} className='flex scroll-mt-16 flex-col gap-4'>
      <TextContainer>
        <Tag color={color} content={tag} />
        <H4 weight='semibold' marginBottom='none' className='font-heading text-foreground'>
          {heading}
        </H4>
      </TextContainer>
      {children}
    </section>
  );
}
