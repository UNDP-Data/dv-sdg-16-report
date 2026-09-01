import { P } from '@undp/design-system-react/Typography';
import { VizCarousel } from '@undp/design-system-react/VizCarousel';
import BigNumber from '@/components/BigNumber';

export default function FeaturedNumbers() {
  return (
    <VizCarousel
      vizWidth='full'
      autoScroll={3000}
      classNames={{
        arrowButton:
          'border border-stroke bg-background hover:bg-background-soft [&.opacity-disabled]:pointer-events-none [&.opacity-disabled]:bg-transparent [&.opacity-disabled]:opacity-30',
        arrows: 'text-foreground',
        content: '[&_p]:hidden!',
        progressBar: 'hidden!',
        progressBarBg: 'hidden!',
      }}
      styles={{ arrows: { strokeWidth: 1.5 } }}
      slides={[
        {
          content: null,
          viz: (
            <div className='grid gap-4 md:grid-cols-3'>
              <div className='flex flex-col bg-background-soft p-6'>
                <BigNumber
                  value={23}
                  suffix='%'
                  color='primary'
                  label='Decline in documented civilian fatalities in 2025, after three consecutive years of rising conflict-related deaths.'
                />
                <P
                  marginBottom='none'
                  size='xs'
                  className='mt-auto truncate pt-6 text-content-secondary uppercase tracking-wider'
                >
                  Peace – Conflict-related deaths (16.1.2)
                </P>
              </div>
              <div className='flex flex-col bg-background-soft p-6'>
                <BigNumber
                  value={1.5}
                  suffix='bn'
                  color='secondary'
                  label='People estimated to have unmet justice needs worldwide.'
                />
                <P
                  marginBottom='none'
                  size='xs'
                  className='mt-auto truncate pt-6 text-content-secondary uppercase tracking-wider'
                >
                  Justice – Access to civil justice (16.3.3)
                </P>
              </div>
              <div className='flex flex-col bg-background-soft p-6'>
                <BigNumber
                  value={27.5}
                  suffix='%'
                  color='tertiary'
                  label='Share of parliamentary seats held by women globally in 2026, up from 27.2 per cent in 2025.'
                />
                <P
                  marginBottom='none'
                  size='xs'
                  className='mt-auto truncate pt-6 text-content-secondary uppercase tracking-wider'
                >
                  Inclusion – Representation in the legislature (16.7.1 (a))
                </P>
              </div>
            </div>
          ),
        },
        {
          content: null,
          viz: (
            <div className='grid gap-4 md:grid-cols-3'>
              <div className='flex flex-col bg-background-soft p-6'>
                <BigNumber
                  value={13.2}
                  suffix='%'
                  color='primary'
                  label='Fall in the global homicide rate between 2015 and 2024.'
                />
                <P
                  marginBottom='none'
                  size='xs'
                  className='mt-auto truncate pt-6 text-content-secondary uppercase tracking-wider'
                >
                  Peace – Homicide (16.1.1)
                </P>
              </div>
              <div className='flex flex-col bg-background-soft p-6'>
                <BigNumber
                  value={46}
                  suffix='%'
                  color='secondary'
                  label='Global average tracing rate for seized firearms between 2016 and 2024.'
                />
                <P
                  marginBottom='none'
                  size='xs'
                  className='mt-auto truncate pt-6 text-content-secondary uppercase tracking-wider'
                >
                  Justice – Illicit firearms flows (16.4.2)
                </P>
              </div>
              <div className='flex flex-col bg-background-soft p-6'>
                <BigNumber
                  value={150}
                  suffix='m'
                  color='tertiary'
                  label='Children who still have no legal identity, even as birth registration continues to expand.'
                />
                <P
                  marginBottom='none'
                  size='xs'
                  className='mt-auto truncate pt-6 text-content-secondary uppercase tracking-wider'
                >
                  Inclusion – Legal identity (16.9.1)
                </P>
              </div>
            </div>
          ),
        },
        {
          content: null,
          viz: (
            <div className='grid gap-4 md:grid-cols-3'>
              <div className='flex flex-col bg-background-soft p-6'>
                <BigNumber
                  value={37}
                  suffix='%'
                  color='primary'
                  label='Share of all detected trafficking victims who were children in 2024, nearly three times the 2004 share.'
                />
                <P
                  marginBottom='none'
                  size='xs'
                  className='mt-auto truncate pt-6 text-content-secondary uppercase tracking-wider'
                >
                  Peace – Trafficking in persons (16.2.2)
                </P>
              </div>
              <div className='flex flex-col bg-background-soft p-6'>
                <BigNumber
                  value={17}
                  suffix='%'
                  color='secondary'
                  label='Median bribery prevalence across the 139 countries and territories with available data.'
                />
                <P
                  marginBottom='none'
                  size='xs'
                  className='mt-auto truncate pt-6 text-content-secondary uppercase tracking-wider'
                >
                  Justice – Bribery among the population (16.5.1)
                </P>
              </div>
              <div className='flex flex-col bg-background-soft p-6'>
                <BigNumber
                  value='1 in 5'
                  barPercent={20}
                  color='tertiary'
                  label='People report having personally experienced discrimination in the previous 12 months.'
                />
                <P
                  marginBottom='none'
                  size='xs'
                  className='mt-auto truncate pt-6 text-content-secondary uppercase tracking-wider'
                >
                  Inclusion – Experience of discrimination (16.b.1)
                </P>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}
