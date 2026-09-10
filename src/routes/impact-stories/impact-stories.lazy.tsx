import { useQuery } from '@tanstack/react-query';
import { createLazyRoute, Link } from '@tanstack/react-router';
import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';
import { CardDescription, CardFooter, CardTag, CardTitle } from '@undp/design-system-react/Card';
import { Grid } from '@undp/design-system-react/Grid';
import { Spinner } from '@undp/design-system-react/Spinner';
import { H1, P } from '@undp/design-system-react/Typography';
import { ArrowRight } from 'lucide-react';
import ContentCard from '@/components/ContentCard';
import ErrorEl from '@/components/ErrorEl';
import type { ImpactStoryDataType } from '@/types';

function useData() {
  return useQuery({
    queryKey: ['impact-stories'],
    queryFn: () => fetchAndParseJSON('/data/impactStories.json') as Promise<ImpactStoryDataType[]>,
  });
}

export function ImpactStories() {
  const { data, isLoading, isError } = useData();

  if (isLoading) return <Spinner size='lg' className='mx-auto my-20' />;
  if (isError) return <ErrorEl />;
  return (
    <>
      <section
        className='bg-bottom-right bg-cover bg-foreground-soft px-6 py-16 md:px-12 md:py-24'
        style={{ backgroundImage: `url('/imgs/report/default-hero.webp')` }}
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
            {data?.map((entry) => (
              <Link to='/impact-stories/$storyId' params={{ storyId: entry.id }} key={entry.id}>
                <ContentCard key={entry.id}>
                  <CardTag className='block truncate p-0! font-semibold text-content-secondary tracking-wider'>
                    {entry.chapter} &ndash; {entry.indicatorCode} &ndash; {entry.indicatorTitle}
                  </CardTag>
                  <CardTitle className='line-clamp-3 p-0! font-heading font-medium text-2xl! text-foreground leading-[130%]'>
                    {entry.title}
                  </CardTitle>
                  <CardDescription className='line-clamp-2 p-0! text-content-secondary text-lg!'>
                    {entry.story}
                  </CardDescription>
                  <CardFooter className='mt-auto gap-1 p-0! font-semibold text-blue-500 text-sm uppercase tracking-wider'>
                    Read story
                    <ArrowRight
                      size={18}
                      className='shrink-0 transition-transform group-hover:translate-x-1'
                    />
                  </CardFooter>
                </ContentCard>
              </Link>
            ))}
          </Grid>
        </div>
      </section>
    </>
  );
}

export const Route = createLazyRoute('/impact-stories')({
  component: ImpactStories,
});
