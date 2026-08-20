import { UnitChart } from '@undp/data-viz/UnitChart';
import { P } from '@undp/design-system-react/Typography';
import BigNumber from '@/components/BigNumber';
import { CHART_PADDING } from '@/constants';

export default function SexualViolenceInChildhoodUnitChart() {
  return (
    <div className='flex flex-col gap-6 bg-background-soft' style={{ padding: CHART_PADDING }}>
      <div className='flex flex-col gap-1'>
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          People who experienced sexual violence in childhood
        </P>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          Estimated prevalence among today’s population
        </P>
      </div>

      <div className='flex flex-wrap gap-10'>
        <div className='flex flex-col gap-2'>
          <BigNumber color='var(--women)' value='1 in 8' label='girls and women' />
          <UnitChart
            data={[
              { label: 'Affected', value: 1 },
              { label: 'Remaining', value: 7 },
            ]}
            colors={['var(--women)', '#ffffff']}
            totalNoOfDots={8}
            gridSize={8}
            unitPadding={3}
            size={224}
            showColorScale={false}
            showStrokeForWhiteDots
            backgroundColor={false}
            padding='0'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <BigNumber color='var(--male)' value='1 in 11' label='boys and men' />
          <UnitChart
            data={[
              { label: 'Affected', value: 1 },
              { label: 'Remaining', value: 10 },
            ]}
            colors={['var(--male)', '#ffffff']}
            totalNoOfDots={11}
            gridSize={11}
            unitPadding={3}
            size={308}
            showColorScale={false}
            showStrokeForWhiteDots
            backgroundColor={false}
            padding='0'
          />
        </div>
      </div>

      <P marginBottom='none' size='sm' className='text-content-secondary'>
        Source: TBA
      </P>
    </div>
  );
}
