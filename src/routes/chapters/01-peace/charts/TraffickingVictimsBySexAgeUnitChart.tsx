import { Colors } from '@undp/data-viz/Colors';
import { UnitChart } from '@undp/data-viz/UnitChart';
import { H2, P } from '@undp/design-system-react/Typography';
import { CHART_PADDING } from '@/constants';
import traffickingVictimsBySexAge from '@/data/chapters/01-peace/16-2-2/trafficking-victims-by-sex-age.json';
import ChartNote from '../../components/ChartNote';

const valueFor = (group: string) =>
  traffickingVictimsBySexAge.find((d) => d.group === group)?.value ?? 0;

const WOMEN = valueFor('Women');
const GIRLS = valueFor('Girls');
const MEN = valueFor('Men');
const BOYS = valueFor('Boys');

const FEMALE_TOTAL = WOMEN + GIRLS;
const MALE_TOTAL = MEN + BOYS;

const FEMALE_COLORS = [
  Colors.genderColors.female,
  `color-mix(in srgb, ${Colors.genderColors.female} 45%, white)`,
];
const MALE_COLORS = [
  Colors.genderColors.male,
  `color-mix(in srgb, ${Colors.genderColors.male} 45%, white)`,
];

export default function TraffickingVictimsBySexAgeStackedBar() {
  return (
    <div className='flex flex-col gap-6 bg-background-soft' style={{ padding: CHART_PADDING }}>
      <div className='flex flex-col gap-1'>
        <P size='xl' marginBottom='none' className='font-heading font-semibold leading-sm'>
          Share of detected victims of trafficking, by victim sex and age
        </P>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          2024 or most recent year available
        </P>
      </div>

      <div className='flex flex-col gap-10'>
        <div className='flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-5'>
          <UnitChart
            data={[
              { label: 'Women', value: WOMEN },
              { label: 'Girls', value: GIRLS },
            ]}
            colors={FEMALE_COLORS}
            size={innerWidth < 720 ? 280 : 500}
            gridSize={10}
            numberDisplayOptions={{ suffix: '%' }}
            ariaLabel={`Unit chart showing the age breakdown of female trafficking victims. Women make up ${WOMEN} per cent and girls ${GIRLS} per cent, together ${FEMALE_TOTAL} per cent of all detected victims.`}
          />
          <div className='w-full shrink-0 sm:w-32'>
            <H2
              weight='medium'
              marginBottom='sm'
              className='m-0 pt-12 font-heading text-categorical-female leading-none'
            >
              {FEMALE_TOTAL}
              <span className='ml-0.5 text-2xl md:text-3xl'>%</span>
            </H2>
            <P marginBottom='none' size='base' className='text-foreground'>
              female victims
            </P>
          </div>
        </div>
        <div className='flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-5'>
          <UnitChart
            data={[
              { label: 'Men', value: MEN },
              { label: 'Boys', value: BOYS },
            ]}
            colors={MALE_COLORS}
            size={innerWidth < 720 ? 280 : 500}
            gridSize={10}
            numberDisplayOptions={{ suffix: '%' }}
            ariaLabel={`Unit chart showing the age breakdown of male trafficking victims. Men make up ${MEN} per cent and boys ${BOYS} per cent, together ${MALE_TOTAL} per cent of all detected victims.`}
          />
          <div className='w-full shrink-0 sm:w-32'>
            <H2
              weight='medium'
              marginBottom='sm'
              className='m-0 pt-12 font-heading text-categorical-male leading-none'
            >
              {MALE_TOTAL}
              <span className='ml-0.5 text-2xl md:text-3xl'>%</span>
            </H2>
            <P marginBottom='none' size='base' className='text-foreground'>
              male victims
            </P>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-1'>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          Source: UNODC
        </P>
        <ChartNote content='Female victims account for 56 per cent of the total, made up of 36 per cent women and 20 per cent girls. Male victims account for 44 per cent, made up of 27 per cent men and 17 per cent boys.' />
      </div>
    </div>
  );
}
