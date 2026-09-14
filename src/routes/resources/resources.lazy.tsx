import { useQuery } from '@tanstack/react-query';
import { createLazyRoute } from '@tanstack/react-router';
import { DataCards } from '@undp/data-viz/DataCards';
import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';
import { Badge } from '@undp/design-system-react/Badge';
import { CardTitle } from '@undp/design-system-react/Card';
import { cn } from '@undp/design-system-react/cn';
import { DropdownSelect, type OptionType } from '@undp/design-system-react/DropdownSelect';
import { Search } from '@undp/design-system-react/Search';
import { Spinner } from '@undp/design-system-react/Spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@undp/design-system-react/Tabs';
import { H1, P } from '@undp/design-system-react/Typography';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { SectionContainer } from '@/components/Containers';
import ContentCard from '@/components/ContentCard';

interface Publication {
  title: string;
  agency: string;
  year: number;
  type: string;
  indicators: string[];
  link: string | null;
}

interface ChapterTarget {
  indicators: {
    code: string;
    label: string;
    officialIndicators: { code: string }[];
  }[];
}

export function Resources() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['publications'],
    queryFn: () => fetchAndParseJSON('/data/publications.json') as Promise<Publication[]>,
  });
  const { data: targets } = useQuery({
    queryKey: ['target-list'],
    queryFn: () =>
      fetchAndParseJSON('/data/report/targetList.json') as Promise<
        Record<'Peace' | 'Justice' | 'Inclusion', ChapterTarget[]>
      >,
  });
  const [selectedType, setSelectedType] = useState('Relevant publications');
  const [selectedIndicator, setSelectedIndicator] = useState<OptionType | null>(null);
  const [search, setSearch] = useState('');

  const rows = (data ?? [])
    .filter(
      (d) =>
        d.type === selectedType &&
        (!selectedIndicator ||
          `${selectedIndicator.value}`.split(',').some((code) => d.indicators.includes(code))) &&
        `${d.title} ${d.agency}`.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));

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
            Resources
          </H1>
        </div>
      </section>

      <section className='mx-auto w-full px-6 py-12 md:px-12 md:py-16'>
        <SectionContainer className='flex flex-col gap-6'>
          {isLoading ? <Spinner size='lg' className='mx-auto my-20' /> : null}

          {isError || (!isLoading && !data) ? (
            <P marginBottom='none' size='sm' className='text-content-secondary'>
              Unable to load the list of publications.
            </P>
          ) : null}

          {data ? (
            <Tabs value={selectedType} onValueChange={setSelectedType} color='blue'>
              <TabsList className='pl-0'>
                <TabsTrigger
                  value='Relevant publications'
                  className='cursor-pointer text-sm normal-case md:text-base'
                >
                  Relevant publications
                </TabsTrigger>
                <TabsTrigger
                  value='Statistical standards'
                  className='cursor-pointer text-sm normal-case md:text-base'
                >
                  Statistical standards
                </TabsTrigger>
              </TabsList>

              <div className='flex flex-wrap items-center gap-4'>
                <Search
                  placeholder='Search publications'
                  aria-label='Search publications'
                  inputVariant='light'
                  inputSize='sm'
                  inputClassName='h-[42px]'
                  showSearchButton={false}
                  onSearch={(value) => setSearch(value ?? '')}
                  className='min-w-60 flex-1'
                />
                <div className='w-full sm:w-60'>
                  <DropdownSelect
                    options={[
                      ...(['Peace', 'Justice', 'Inclusion'] as const).map((chapter) => ({
                        label: chapter,
                        options: (targets?.[chapter] ?? [])
                          .flatMap((target) => target.indicators)
                          .map((indicator) => ({
                            label: `${indicator.code} ${indicator.label}`,
                            value: indicator.officialIndicators.map((o) => o.code).join(','),
                          }))
                          .filter((option) =>
                            data.some((d) =>
                              option.value.split(',').some((code) => d.indicators.includes(code)),
                            ),
                          ),
                      })),
                    ].filter((group) => group.options.length > 0)}
                    value={selectedIndicator}
                    onChange={(option) => setSelectedIndicator(option as OptionType | null)}
                    isClearable
                    isSearchable
                    placeholder='Filter indicators'
                    variant='light'
                    size='sm'
                    color='primary'
                    aria-label='Filter publications by indicator'
                    classNames={{
                      menu: () => 'sm:w-96!',
                      groupHeading: () =>
                        'm-0! px-3! pt-4! pb-1! font-semibold! text-content-secondary! text-xs! uppercase! tracking-wider!',
                    }}
                  />
                </div>
              </div>

              <TabsContent value={selectedType}>
                <DataCards
                  data={rows}
                  cardMinWidth={360}
                  padding='0'
                  cardBackgroundColor='transparent'
                  ariaLabel={`${selectedType} on Goal 16`}
                  cardTemplate={(d: Publication) => (
                    <a
                      href={d.link ?? undefined}
                      target='_blank'
                      rel='noreferrer'
                      className='block h-full'
                    >
                      <ContentCard
                        className={d.link ? undefined : 'cursor-default hover:bg-transparent'}
                      >
                        <div className='flex flex-col gap-2'>
                          <CardTitle className='p-0! font-heading font-medium text-2xl! text-foreground leading-[130%]'>
                            {d.title}
                          </CardTitle>
                          <P marginBottom='none' size='base' className='text-content-secondary'>
                            {d.agency} · {d.year}
                          </P>
                        </div>
                        <div className='mt-auto flex flex-col gap-4'>
                          <div className='flex flex-col gap-2'>
                            <P
                              marginBottom='none'
                              size='xs'
                              weight='semibold'
                              className='text-content-secondary uppercase tracking-wider'
                            >
                              Indicators
                            </P>
                            <div className='flex min-h-15 flex-wrap items-start gap-2'>
                              {d.indicators.map((indicator) => (
                                <Badge key={indicator} variant='outline' size='sm' rounded='md'>
                                  {indicator}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <span
                            className={cn(
                              'flex w-fit items-center gap-2 font-semibold text-blue-500 text-sm uppercase tracking-wider',
                              !d.link && 'invisible',
                            )}
                          >
                            View resource
                            <ArrowRight
                              size={16}
                              className='transition-transform group-hover:translate-x-1'
                            />
                          </span>
                        </div>
                      </ContentCard>
                    </a>
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
        </SectionContainer>
      </section>
    </>
  );
}

export const Route = createLazyRoute('/resources')({
  component: Resources,
});
