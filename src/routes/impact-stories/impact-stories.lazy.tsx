import { createLazyRoute } from '@tanstack/react-router';
import {
  Card,
  CardDescription,
  CardFooter,
  CardTag,
  CardTitle,
} from '@undp/design-system-react/Card';
import { cn } from '@undp/design-system-react/cn';
import { Grid } from '@undp/design-system-react/Grid';
import { H1, P } from '@undp/design-system-react/Typography';
import { useState } from 'react';
import ImpactStoryModal from '@/components/ImpactStoryModal';
import Tag from '@/components/Tag';
import impactStories from '@/data/impactStories.json';
import type { ImpactStoryDataType } from '@/types';
import { getChapterColor } from '@/Utils/getChapterColor';

export function ImpactStories() {
  const [selectedStory, setSelectedStory] = useState<ImpactStoryDataType | undefined>(undefined);
  return (
    <>
      <section className='bg-foreground-soft px-6 py-16 md:px-12 md:py-24'>
        <div className='mx-auto flex max-w-300 flex-col gap-4'>
          <P
            marginBottom='none'
            size='sm'
            weight='semibold'
            className='text-content-reverse uppercase tracking-widest'
          >
            SDG 16 Report
          </P>
          <H1 marginBottom='sm' className='font-normal text-content-reverse normal-case'>
            Data to impact stories
          </H1>
          <P size='lg' className='max-w-2xl text-content-reverse'>
            How data on peace, justice and inclusion is translating into real institutional and
            policy change around the world.
          </P>
        </div>
      </section>

      <section className='mx-auto px-6 py-12 md:px-12 md:py-16'>
        <div className='max-w-300'>
          <Grid
            gap='16px'
            noOfCol={{
              base: 1,
              md: 2,
              lg: 3,
            }}
          >
            {(impactStories as ImpactStoryDataType[]).map((entry) => (
              <Card
                key={entry.id}
                variant='without-image'
                backgroundColor='background'
                role='button'
                tabIndex={0}
                onClick={() => setSelectedStory(entry)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedStory(entry);
                  }
                }}
                className='h-full cursor-pointer text-left'
              >
                <CardTag>
                  <Tag color={getChapterColor(entry.chapter)} content={entry.chapter} />
                </CardTag>
                <CardTitle className='font-heading font-semibold text-2xl!'>
                  {entry.title}
                </CardTitle>
                <CardDescription>
                  <div className='line-clamp-3'>{entry.story}</div>
                </CardDescription>
                <CardFooter>
                  <P
                    weight='semibold'
                    size='sm'
                    marginBottom='none'
                    className={cn(
                      'group-hover:underline',
                      entry.chapter === 'peace' && 'text-primary',
                      entry.chapter === 'justice' && 'text-secondary',
                      entry.chapter === 'inclusion' && 'text-tertiary',
                    )}
                  >
                    Read full story
                  </P>
                </CardFooter>
              </Card>
            ))}
          </Grid>
        </div>
      </section>
      <ImpactStoryModal
        story={selectedStory as ImpactStoryDataType}
        onClose={() => setSelectedStory(undefined)}
      />
    </>
  );
}

export const Route = createLazyRoute('/impact-stories')({
  component: ImpactStories,
});
