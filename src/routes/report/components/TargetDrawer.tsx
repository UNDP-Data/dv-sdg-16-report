import { useQuery } from '@tanstack/react-query';
import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';
import { cn } from '@undp/design-system-react/cn';
import { Drawer, DrawerContent, DrawerTrigger } from '@undp/design-system-react/Drawer';
import { Spinner } from '@undp/design-system-react/Spinner';
import { H3, P } from '@undp/design-system-react/Typography';
import { ChevronDown } from 'lucide-react';
import ErrorEl from '@/components/ErrorEl';
import Tag from '@/components/Tag';

interface TargetsDrawerProps {
  chapterTitle: 'Peace' | 'Justice' | 'Inclusion';
  bg: string;
  color: 'primary' | 'secondary' | 'tertiary';
}

interface ChapterTargetDataType {
  code: string;
  description: string;
  indicators: {
    code: string;
    label: string;
    officialIndicators: {
      code: string;
      description: string;
    }[];
    dataReporter: string;
  }[];
}

function useData() {
  return useQuery({
    queryKey: ['target-list'],
    queryFn: () =>
      fetchAndParseJSON('/data/report/targetList.json') as Promise<{
        Peace: ChapterTargetDataType[];
        Justice: ChapterTargetDataType[];
        Inclusion: ChapterTargetDataType[];
      }>,
  });
}

export default function TargetsDrawer({ chapterTitle, bg, color }: TargetsDrawerProps) {
  const { data, isLoading, isError } = useData();
  return (
    <Drawer direction='right'>
      <DrawerTrigger asChild>
        <button
          type='button'
          className='fixed right-0 bottom-8 z-20 rounded-l-lg bg-center bg-cover px-5 py-3 shadow-lg transition-[padding-right] duration-300 ease-out hover:pr-12'
          style={{ backgroundImage: `url('${bg}')` }}
        >
          <P size='base' marginBottom='none' weight='bold' className='text-content-reverse'>
            Discover targets
            <br />
            behind this chapter
          </P>
        </button>
      </DrawerTrigger>

      <DrawerContent className='w-full max-w-xl' overlayClassName='bg-surface/95 backdrop-blur-2xl'>
        <div className='flex flex-col gap-6 px-2 py-8 md:py-12'>
          <Tag color={color} content={chapterTitle} />
          <div>
            <H3 weight='semibold' marginBottom='none' className='font-heading leading-tight'>
              Targets and indicators
            </H3>
            <P size='xl' className='text-foreground leading-relaxed'>
              This chapter explores one dimension of SDG 16. Indicators are grouped by target to
              show how each measure contributes to peaceful, just and inclusive societies.
            </P>
          </div>
          <div className='flex flex-col gap-8'>
            {isError ? (
              <ErrorEl />
            ) : isLoading || !data ? (
              <Spinner size='lg' className='mx-auto my-20' />
            ) : (
              data[chapterTitle].map((target) => (
                <div key={target.code}>
                  <Tag color={color} content={`Target ${target.code}`} />
                  <P marginBottom='none' size='lg' className='mt-2'>
                    {target.description}
                  </P>
                  <div className='mt-4 rounded-md border border-stroke-sm'>
                    {target.indicators.map((indicator, index) => (
                      <details
                        key={indicator.code}
                        className={cn('group', index > 0 && 'border-stroke-sm border-t')}
                      >
                        <summary
                          className={cn(
                            'flex min-h-14 cursor-pointer list-none items-center gap-4 px-4 py-5 [&::-webkit-details-marker]:hidden',
                          )}
                        >
                          <P
                            marginBottom='none'
                            size='sm'
                            weight='medium'
                            className={cn(
                              'w-15 shrink-0',
                              color === 'primary' && 'text-primary',
                              color === 'secondary' && 'text-secondary',
                              color === 'tertiary' && 'text-tertiary',
                            )}
                          >
                            {indicator.code}
                          </P>
                          <P marginBottom='none' size='base' className='flex-1 text-foreground'>
                            {indicator.label}
                          </P>
                          <ChevronDown
                            className={cn(
                              'h-5 w-5 shrink-0 text-content-secondary transition-transform duration-200 group-open:rotate-180',
                            )}
                          />
                        </summary>
                        <div className='flex flex-col gap-4 bg-background-soft px-6 py-8'>
                          <div>
                            <P
                              marginBottom='none'
                              size='sm'
                              weight='medium'
                              className='text-content-secondary uppercase tracking-wide'
                            >
                              Official indicator
                            </P>
                            <div className='mt-1 flex flex-col gap-2'>
                              {indicator.officialIndicators.map((officialIndicator) => (
                                <P
                                  key={officialIndicator.code}
                                  marginBottom='none'
                                  size='base'
                                  className='text-foreground'
                                >
                                  {officialIndicator.code} – {officialIndicator.description}
                                </P>
                              ))}
                            </div>
                          </div>
                          <div>
                            <P
                              marginBottom='none'
                              size='sm'
                              weight='medium'
                              className='text-content-secondary uppercase tracking-wide'
                            >
                              Custodian Agency
                            </P>
                            <P marginBottom='none' size='base' className='mt-1 text-foreground'>
                              {indicator.dataReporter}
                            </P>
                          </div>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
