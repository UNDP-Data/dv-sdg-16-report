import { Button } from '@undp/design-system-react/Button';
import { cn } from '@undp/design-system-react/cn';
import { Modal } from '@undp/design-system-react/Modal';
import { H3, P } from '@undp/design-system-react/Typography';
import { useState } from 'react';
import Tag from '@/components/Tag';
import { IMPACT_STORIES } from '@/data/impactStories';

interface ImpactStoryProps {
  id: string;
  color?: 'primary' | 'secondary' | 'tertiary';
  linkLabel?: string;
  className?: string;
}

export default function ImpactStorySection({
  id,
  color = 'primary',
  linkLabel = 'Read full story',
  className = '',
}: ImpactStoryProps) {
  const impactStory = IMPACT_STORIES.find((d) => d.id === id);
  const title = impactStory?.title;
  const story = impactStory?.story;
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`relative isolate mx-[calc(50%-50vw+1.5rem)] w-[calc(100vw-3rem)] overflow-hidden rounded-lg bg-cover bg-foreground bg-right-bottom md:mx-[calc(50%-50vw+3rem)] md:w-[calc(100vw-6rem)] ${className}`}
        style={{ backgroundImage: `url('/imgs/chapters/impact-story-bg.webp')` }}
      >
        <div className='mx-auto flex max-w-300 flex-col gap-4 px-6 py-14 md:px-12 md:py-20'>
          <div className='flex max-w-xl flex-col gap-6'>
            <Tag color={color} content='Data impact story' />
            <H3
              marginBottom='none'
              className='font-heading font-medium font-normal text-[40px]! text-content-reverse'
            >
              {title}
            </H3>
            <P className='line-clamp-3 font-light text-content-reverse'>{story}</P>
            <Button
              type='button'
              onClick={() => setOpen(true)}
              variant='outline'
              arrow={false}
              className={cn(
                'inline-flex w-fit items-center gap-1.5 px-5 py-3 font-medium text-content-reverse text-sm transition-colors hover:bg-foreground/30',
                color === 'primary' && 'border-primary',
                color === 'secondary' && 'border-secondary',
                color === 'tertiary' && 'border-tertiary',
              )}
            >
              {linkLabel}
            </Button>
          </div>
        </div>
      </div>
      <Modal title={title} open={open} onClose={() => setOpen(false)}>
        <div className='text-base text-foreground'>{story}</div>
      </Modal>
    </>
  );
}
