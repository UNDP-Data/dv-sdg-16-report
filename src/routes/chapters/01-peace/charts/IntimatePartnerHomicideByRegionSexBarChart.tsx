import { GroupedBarGraph } from '@undp/data-viz/BarGraph';
import { Colors } from '@undp/data-viz/Colors';
import { P } from '@undp/design-system-react/Typography';
import { CHART_PADDING } from '@/constants';
import intimatePartnerHomicideShareByRegionSex from '@/data/chapters/01-peace/16-1-1/intimate-partner-homicide-share-by-region-sex.json';
import ChartNote from '../../components/ChartNote';

const regionData = intimatePartnerHomicideShareByRegionSex.filter((d) => d.region !== 'World');
const worldData = intimatePartnerHomicideShareByRegionSex.find((d) => d.region === 'World');

export default function IntimatePartnerHomicideByRegionSexBarChart() {
  return (
    <GroupedBarGraph
      data={regionData.map((d) => ({
        label: d.region,
        size: [d.male, d.female],
      }))}
      orientation='vertical'
      colorDomain={['Men', 'Women']}
      colors={[Colors.genderColors.male, Colors.genderColors.female]}
      minValue={0}
      maxValue={80}
      rightMargin={130}
      showValues
      valueColor='var(--content-primary)'
      showTicks={false}
      numberDisplayOptions={{ suffix: '%' }}
      barPadding={0.3}
      height={500}
      padding={CHART_PADDING}
      refValues={
        worldData
          ? [
              {
                value: worldData.male,
                text: `World (men) ${worldData.male}%`,
                color: Colors.genderColors.male,
              },
              {
                value: worldData.female,
                text: `World (women) ${worldData.female}%`,
                color: Colors.genderColors.female,
              },
            ]
          : undefined
      }
      styles={{
        tooltip: {
          padding: 0,
        },
      }}
      tooltip={(d) => (
        <div className='flex flex-col gap-1 bg-white px-3 py-2'>
          <P size='sm' weight='semibold' marginBottom='none'>
            {d.label}
          </P>
          {(['Men', 'Women'] as const).map((sex, i) => (
            <div key={sex} className='flex items-center justify-between gap-4'>
              <P size='sm' marginBottom='none' className='flex items-center gap-1.5'>
                <span
                  className='h-0.75 w-3'
                  style={{
                    backgroundColor:
                      sex === 'Men' ? Colors.genderColors.male : Colors.genderColors.female,
                  }}
                />
                {sex}
              </P>
              <P size='sm' weight='bold' marginBottom='none' className='text-content-secondary'>
                {d.size[i]}%
              </P>
            </div>
          ))}
        </div>
      )}
      graphTitle={
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Share of victims of intimate partner/family member homicide among all victims of homicide,
          by region and sex
        </P>
      }
      graphDescription='2024'
      sources={[
        {
          source:
            'UNODC estimates based on responses to the United Nations Survey of Crime Trends and Operations of Criminal Justice Systems and data from other sources reviewed by Member States.',
        },
      ]}
      footNote={
        <ChartNote content='Data on the share of intimate partner/family member homicide out of all homicides is not available for SDG regions. World reference lines show the global share for each sex.' />
      }
      ariaLabel='Grouped bar chart showing the share of victims of intimate partner or family member homicide among all homicide victims, by region and sex, with reference lines for the world average. Women are disproportionately affected in every region, ranging from 45 per cent in the Americas to 74 per cent in Africa, compared with 8 to 26 per cent for men. The world average is 60 per cent for women and 11 per cent for men.'
    />
  );
}
