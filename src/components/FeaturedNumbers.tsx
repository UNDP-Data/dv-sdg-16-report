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
                  value={14}
                  suffix=' min'
                  color='primary'
                  label='Estimated interval between civilian deaths recorded in armed conflict.'
                />
                <P
                  marginBottom='none'
                  size='xs'
                  className='mt-auto truncate pt-6 text-content-secondary uppercase tracking-wider'
                >
                  Peace – 16.1.2 – Conflict-related deaths
                </P>
              </div>
              <div className='flex flex-col bg-background-soft p-6'>
                <BigNumber
                  value='1 in 3'
                  color='secondary'
                  label='Prisoners globally held in detention without having been sentenced.'
                />
                <P
                  marginBottom='none'
                  size='xs'
                  className='mt-auto truncate pt-6 text-content-secondary uppercase tracking-wider'
                >
                  Justice – 16.3.2 – Unsentenced detention
                </P>
              </div>
              <div className='flex flex-col bg-background-soft p-6'>
                <BigNumber
                  value={150}
                  suffix=' million'
                  color='tertiary'
                  label='Children who still have no legal identity, even as birth registration continues to expand.'
                />
                <P
                  marginBottom='none'
                  size='xs'
                  className='mt-auto truncate pt-6 text-content-secondary uppercase tracking-wider'
                >
                  Inclusion – 16.9.1 – Legal identity
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
                  value='400,000+'
                  color='primary'
                  label='People who die of intentional homicide worldwide every year.'
                />
                <P
                  marginBottom='none'
                  size='xs'
                  className='mt-auto truncate pt-6 text-content-secondary uppercase tracking-wider'
                >
                  Peace – 16.1.1 – Homicide
                </P>
              </div>
              <div className='flex flex-col bg-background-soft p-6'>
                <BigNumber
                  value={1.6}
                  suffix=' billion'
                  color='primary'
                  label='Children who experience violent discipline at home.'
                />
                <P
                  marginBottom='none'
                  size='xs'
                  className='mt-auto truncate pt-6 text-content-secondary uppercase tracking-wider'
                >
                  Peace – 16.2.1 & 16.2.3 – Violence against children
                </P>
              </div>
              <div className='flex flex-col bg-background-soft p-6'>
                <BigNumber
                  value='1 in 4'
                  color='tertiary'
                  label='Parliamentary seats worldwide held by women.'
                />
                <P
                  marginBottom='none'
                  size='xs'
                  className='mt-auto truncate pt-6 text-content-secondary uppercase tracking-wider'
                >
                  Inclusion – 16.7.1 (a) – Representation in the legislature
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
                  value='1 in 3'
                  color='primary'
                  label='Detected trafficking victims who are children.'
                />
                <P
                  marginBottom='none'
                  size='xs'
                  className='mt-auto truncate pt-6 text-content-secondary uppercase tracking-wider'
                >
                  Peace – 16.2.2 – Trafficking in persons
                </P>
              </div>
              <div className='flex flex-col bg-background-soft p-6'>
                <BigNumber
                  value='1 in 5'
                  color='tertiary'
                  label='People worldwide who report personally experiencing discrimination.'
                />
                <P
                  marginBottom='none'
                  size='xs'
                  className='mt-auto truncate pt-6 text-content-secondary uppercase tracking-wider'
                >
                  Inclusion – 16.b.1 – Experience of discrimination
                </P>
              </div>
              <div className='flex flex-col bg-background-soft p-6'>
                <BigNumber
                  value={0.8}
                  color='tertiary'
                  label='Representation ratio for women in the public service, against parity at 1.00.'
                />
                <P
                  marginBottom='none'
                  size='xs'
                  className='mt-auto truncate pt-6 text-content-secondary uppercase tracking-wider'
                >
                  Inclusion – 16.7.1 (b) and (c) – Representation in the public service and the
                  judiciary
                </P>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}
