import { useQuery } from '@tanstack/react-query';
import { createLazyRoute } from '@tanstack/react-router';
import { DataCards } from '@undp/data-viz/DataCards';
import { fetchAndParseCSV } from '@undp/data-viz/fetchAndParseData';
import { Badge } from '@undp/design-system-react/Badge';
import { SegmentedControl } from '@undp/design-system-react/SegmentedControl';
import { Spinner } from '@undp/design-system-react/Spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@undp/design-system-react/Tabs';
import { H1, P } from '@undp/design-system-react/Typography';
import { ArrowRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { PublicationRow } from '@/types';

export function Resources() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['publications'],
    queryFn: () => fetchAndParseCSV('/data/publications.csv') as Promise<PublicationRow[]>,
  });
  const [selectedChapter, setSelectedChapter] = useState('all');
  const [selectedType, setSelectedType] = useState('Flagship publication');

  const rows = useMemo(() => {
    if (!data) return [];
    const filtered = data.filter(
      (d) =>
        d.Type === selectedType &&
        (selectedChapter === 'all' || (d.Chapter?.split('; ').includes(selectedChapter) ?? false)),
    );
    return filtered.sort(
      (a, b) =>
        b['Publication year'] - a['Publication year'] ||
        a['Publication title'].localeCompare(b['Publication title']),
    );
  }, [data, selectedChapter, selectedType]);

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
            Resources
          </H1>
        </div>
      </section>

      <section className='mx-auto w-full px-6 py-12 md:px-12 md:py-16'>
        <div className='mx-auto flex max-w-300 flex-col gap-6'>
          {isLoading ? <Spinner size='lg' className='mx-auto my-20' /> : null}

          {isError || (!isLoading && !data) ? (
            <P marginBottom='none' size='sm' className='text-content-secondary'>
              Unable to load the list of publications.
            </P>
          ) : null}

          {data ? (
            <Tabs
              value={selectedType}
              onValueChange={setSelectedType}
              color='blue'
              className='flex flex-col gap-0'
            >
              <SegmentedControl
                options={[
                  { value: 'all', label: 'All dimensions' },
                  { value: 'Peace', label: 'Peace' },
                  { value: 'Justice', label: 'Justice' },
                  { value: 'Inclusion', label: 'Inclusion' },
                ]}
                value={selectedChapter}
                onValueChange={setSelectedChapter}
                variant='light'
                size='sm'
                color='foreground'
                className='mb-4 w-fit'
              />

              <TabsList className='mb-0 flex-wrap pl-0'>
                <TabsTrigger
                  value='Flagship publication'
                  className='text-sm normal-case md:text-base'
                >
                  Flagship publications
                </TabsTrigger>
                <TabsTrigger
                  value='Statistical product'
                  className='text-sm normal-case md:text-base'
                >
                  Statistical products
                </TabsTrigger>
              </TabsList>

              <TabsContent value={selectedType}>
                <DataCards
                  data={rows}
                  cardMinWidth={360}
                  padding='0'
                  cardBackgroundColor='transparent'
                  ariaLabel={`${selectedType} on Goal 16`}
                  cardTemplate={(d: PublicationRow) => (
                    <div className='flex h-full min-h-80 flex-col gap-4 border border-content-reverse bg-background p-8'>
                      <P marginBottom='none' className='font-heading text-2xl leading-sm'>
                        {d['Publication title']}
                      </P>
                      <P marginBottom='none' size='base' className='text-content-secondary'>
                        {d.Agency} · {d['Publication year']}
                      </P>
                      {d.Indicators && d.Indicators !== 'General' ? (
                        <div className='mt-auto flex flex-col gap-2 pt-2'>
                          <P
                            marginBottom='none'
                            size='xs'
                            weight='semibold'
                            className='text-content-secondary uppercase tracking-wider'
                          >
                            Indicators
                          </P>
                          <div className='flex min-h-15 flex-wrap content-start items-start gap-2'>
                            {d.Indicators.split(', ').map((indicator) => (
                              <Badge key={indicator} variant='outline' size='sm' rounded='md'>
                                {indicator}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ) : null}
                      {d.Link ? (
                        <a
                          href={d.Link}
                          target='_blank'
                          rel='noreferrer'
                          aria-label={`View "${d['Publication title']}" (opens in a new tab)`}
                          className='group mt-auto flex w-fit items-center gap-2 pt-2 font-semibold text-blue-500 text-sm uppercase tracking-wider'
                        >
                          View resource
                          <ArrowRight
                            size={16}
                            className='transition-transform group-hover:translate-x-1'
                          />
                        </a>
                      ) : null}
                    </div>
                  )}
                />
              </TabsContent>

              {rows.length === 0 ? (
                <P marginBottom='none' size='sm' className='text-content-secondary'>
                  No publications match the selected filters.
                </P>
              ) : null}
            </Tabs>
          ) : null}
        </div>
      </section>
    </>
  );
}

export const Route = createLazyRoute('/resources')({
  component: Resources,
});
