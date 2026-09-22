import { P } from '@undp/design-system-react/Typography';
import { VizCarousel } from '@undp/design-system-react/VizCarousel';
import BigNumber from '@/components/BigNumber';

const FEATURED_NUMBERS = [
  {
    value: 14,
    suffix: ' min',
    color: 'primary',
    label: 'Estimated interval between civilian deaths recorded in armed conflict.',
    tag: 'Peace – 16.1.2 – Conflict-related deaths',
  },
  {
    value: '1 in 3',
    color: 'secondary',
    label: 'Prisoners globally held in detention without having been sentenced.',
    tag: 'Justice – 16.3.2 – Unsentenced detention',
  },
  {
    value: 150,
    suffix: ' million',
    color: 'tertiary',
    label:
      'Children who still have no legal identity, even as birth registration continues to expand.',
    tag: 'Inclusion – 16.9.1 – Legal identity',
  },
  {
    prefix: 'More than',
    value: '400,000',
    color: 'primary',
    label: 'People who die of intentional homicide worldwide every year.',
    tag: 'Peace – 16.1.1 – Homicide',
  },
  {
    value: 1.6,
    suffix: ' billion',
    color: 'primary',
    label: 'Children who experience violent discipline at home.',
    tag: 'Peace – 16.2.1 & 16.2.3 – Violence against children',
  },
  {
    value: '1 in 4',
    color: 'tertiary',
    label: 'Parliamentary seats worldwide held by women.',
    tag: 'Inclusion – 16.7.1 (a) – Representation in the legislature',
  },
  {
    value: '1 in 3',
    color: 'primary',
    label: 'Detected trafficking victims who are children.',
    tag: 'Peace – 16.2.2 – Trafficking in persons',
  },
  {
    value: '1 in 5',
    color: 'tertiary',
    label: 'People worldwide who report personally experiencing discrimination.',
    tag: 'Inclusion – 16.b.1 – Experience of discrimination',
  },
  {
    value: '20',
    suffix: '%',
    color: 'tertiary',
    label:
      'Short of parity in women’s representation in the public service, and 12% short in the judiciary.',
    tag: 'Inclusion – 16.7.1 (b) and (c) – Representation in the public service and the judiciary',
  },
] as const;

export default function FeaturedNumbers() {
  return (
    <VizCarousel
      vizWidth='full'
      autoScroll={3000}
      classNames={{
        arrowButton:
          'border border-stroke bg-background hover:bg-background-soft [&.opacity-disabled]:opacity-30',
        arrows: 'text-foreground',
        playPauseButton: 'border border-stroke bg-background hover:bg-background-soft',
        playPauseIcon: 'text-foreground',
        content: '[&_p]:hidden!',
        progressBar: 'hidden!',
        progressBarBg: 'hidden!',
      }}
      styles={{ arrows: { strokeWidth: 1.5 }, playPauseIcon: { strokeWidth: 1.5 } }}
      slides={(innerWidth < 768
        ? FEATURED_NUMBERS.map((card) => [card])
        : [FEATURED_NUMBERS.slice(0, 3), FEATURED_NUMBERS.slice(3, 6), FEATURED_NUMBERS.slice(6, 9)]
      ).map((cards) => ({
        content: null,
        viz: (
          <div className='grid gap-4 md:grid-cols-3'>
            {cards.map((card) => (
              <div key={card.tag} className='flex flex-col bg-background-soft p-6'>
                {'prefix' in card ? (
                  <span className='h-0 translate-y-1.5 font-heading font-semibold text-lg text-primary leading-6'>
                    {card.prefix}
                  </span>
                ) : null}
                <BigNumber
                  value={card.value}
                  suffix={'suffix' in card ? card.suffix : undefined}
                  color={card.color}
                  label={card.label}
                />
                <P
                  marginBottom='none'
                  size='xs'
                  className='mt-auto truncate pt-6 text-content-secondary uppercase tracking-wider'
                >
                  {card.tag}
                </P>
              </div>
            ))}
          </div>
        ),
      }))}
    />
  );
}
