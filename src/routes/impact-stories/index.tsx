import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';
import { cn } from '@undp/design-system-react/cn';
import { Grid } from '@undp/design-system-react/Grid';
import { Modal } from '@undp/design-system-react/Modal';
import { Spacer } from '@undp/design-system-react/Spacer';
import { H1, P } from '@undp/design-system-react/Typography';
import { useState } from 'react';
import Tag from '@/components/Tag';
import { IMPACT_STORIES } from '@/data/impactStories';

export function ImpactStories() {
  const [modalData, setModalData] = useState<undefined | { title: string; story: React.ReactNode }>(
    undefined,
  );
  return (
    <>
      <section className='bg-foreground-soft px-6 py-16 md:px-12 md:py-24'>
        <div className='mx-auto flex max-w-300 flex-col gap-4'>
          <P
            marginBottom='none'
            size='sm'
            className='font-semibold text-surface-sm uppercase tracking-widest'
          >
            SDG 16 Report
          </P>
          <H1 marginBottom='sm' className='font-normal text-content-reverse normal-case'>
            Impact stories
          </H1>
          <P size='lg' className='max-w-2xl text-surface-sm'>
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
            {IMPACT_STORIES.map((entry) => (
              <button
                type='button'
                key={entry.id}
                onClick={() => setModalData({ title: entry.title, story: entry.story })}
                className='group flex h-full flex-col items-start gap-3 rounded-lg border border-stroke-sm p-6 text-left transition-shadow hover:shadow-md'
              >
                <div className='grow'>
                  <Tag
                    color={
                      entry.chapter === 'peace'
                        ? 'primary'
                        : entry.chapter === 'justice'
                          ? 'secondary'
                          : 'tertiary'
                    }
                    content={entry.chapter}
                  />
                  <Spacer size='base' />
                  <P size='lg' marginBottom='sm'>
                    {entry.title}
                  </P>
                  <P size='sm' marginBottom='none' className='line-clamp-3 text-content-secondary'>
                    {entry.story}
                  </P>
                </div>
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
              </button>
            ))}
          </Grid>
        </div>
      </section>
      <Modal
        title={modalData?.title}
        open={!!modalData?.story}
        onClose={() => setModalData(undefined)}
      >
        <div className='text-base text-foreground'>{modalData?.story}</div>
      </Modal>
    </>
  );
}

export default function createImpactStoriesRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/impact-stories',
    component: ImpactStories,
    getParentRoute: () => parentRoute,
  });
}
