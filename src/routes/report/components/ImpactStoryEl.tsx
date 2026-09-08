import { useQuery } from '@tanstack/react-query';
import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';
import { Button } from '@undp/design-system-react/Button';
import { cn } from '@undp/design-system-react/cn';
import { Spinner } from '@undp/design-system-react/Spinner';
import { H4, P } from '@undp/design-system-react/Typography';
import { useState } from 'react';
import ErrorEl from '@/components/ErrorEl';
import ImpactStoryModal from '@/components/ImpactStoryModal';
import Tag from '@/components/Tag';
import type { ImpactStoryDataType } from '@/types';
import { ImpactStoriesContainer } from '../../../components/Containers';

interface ImpactStoryProps {
  id: string;
  color?: 'primary' | 'secondary' | 'tertiary';
  asChild?: boolean;
}

function useData() {
  return useQuery({
    queryKey: ['impact-stories'],
    queryFn: () => fetchAndParseJSON('/data/impactStories.json') as Promise<ImpactStoryDataType[]>,
  });
}

export default function ImpactStoryEl({ id, color = 'primary', asChild = true }: ImpactStoryProps) {
  const [open, setOpen] = useState(false);

  const Comp = !asChild ? 'div' : ImpactStoriesContainer;
  const { data, isLoading, isError } = useData();

  if (isLoading) return <Spinner size='lg' className='mx-auto my-20' />;
  if (isError) return <ErrorEl />;

  const impactStory = data?.find((d) => d.id === id);
  return (
    <>
      <Comp className='w-full'>
        <div
          className='h-full w-full bg-bottom-right bg-cover'
          style={{ backgroundImage: `url('/imgs/chapters/default-hero.webp')` }}
        >
          <div className='mx-auto flex max-w-300 flex-col gap-4 px-6 py-14 md:px-12 md:py-20'>
            <div className='flex max-w-xl flex-col gap-6'>
              <Tag color={color} content='Data to impact stories' />
              <H4
                weight='semibold'
                marginBottom='none'
                className='font-heading text-content-reverse'
              >
                {impactStory?.title}
              </H4>
              <P className='line-clamp-3 font-light text-content-reverse'>{impactStory?.story}</P>
              <Button
                type='button'
                onClick={() => setOpen(true)}
                variant='outline'
                arrow={false}
                className={cn(
                  'w-fit gap-1.5 px-5 py-3 text-content-reverse text-sm transition-colors hover:bg-background/10',
                  color === 'primary' && 'border-primary',
                  color === 'secondary' && 'border-secondary',
                  color === 'tertiary' && 'border-tertiary',
                )}
              >
                Read full story
              </Button>
            </div>
          </div>
        </div>
      </Comp>
      <ImpactStoryModal
        story={open ? (impactStory as ImpactStoryDataType) : undefined}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
