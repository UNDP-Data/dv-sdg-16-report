import { createLazyRoute } from '@tanstack/react-router';
import {
  Card,
  CardDescription,
  CardFooter,
  CardTag,
  CardTitle,
} from '@undp/design-system-react/Card';
import { Grid } from '@undp/design-system-react/Grid';
import { H1, P } from '@undp/design-system-react/Typography';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import ImpactStoryModal from '@/components/ImpactStoryModal';
import impactStories from '@/data/impactStories.json';
import type { ImpactStoryDataType } from '@/types';

export function ImpactStories() {
  const [selectedStory, setSelectedStory] = useState<ImpactStoryDataType | undefined>(undefined);
  return (
    <>
      <section
        className='bg-bottom-right bg-cover bg-foreground-soft px-6 py-16 md:px-12 md:py-24'
        style={{ backgroundImage: `url('/imgs/chapters/impact-story-bg.webp')` }}
      >
        <div className='mx-auto flex max-w-300 flex-col gap-4'>
          <P
            marginBottom='none'
            size='sm'
            weight='semibold'
            className='text-content-secondary uppercase tracking-widest'
          >
            Global Progress Report on SDG 16
          </P>
          <H1 marginBottom='sm' className='font-normal text-content-reverse normal-case'>
            Data to impact stories
          </H1>
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
                border={false}
                variant='without-image'
                backgroundColor='transparent'
                role='button'
                tabIndex={0}
                onClick={() => setSelectedStory(entry)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedStory(entry);
                  }
                }}
                className='group h-full min-h-80 cursor-pointer justify-start gap-4 border border-stroke-sm p-8 text-left transition-colors hover:border-stroke'
              >
                <CardTag className='p-0! font-semibold text-content-secondary tracking-wider'>
                  {entry.chapter} &middot; Indicator {entry.indicatorCode}
                </CardTag>
                <CardTitle className='line-clamp-3 p-0! font-heading font-medium text-2xl! text-foreground leading-[130%]'>
                  {entry.title}
                </CardTitle>
                <CardDescription className='line-clamp-2 p-0! text-base! text-content-secondary'>
                  {entry.story}
                </CardDescription>
                <CardFooter className='mt-auto gap-1 p-0! font-semibold text-blue-500 text-sm uppercase tracking-wider'>
                  Read story
                  <ArrowRight
                    size={18}
                    className='shrink-0 transition-transform group-hover:translate-x-1'
                  />
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
