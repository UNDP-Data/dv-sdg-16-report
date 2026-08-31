import { ColorLegend } from '@undp/data-viz/ColorLegend';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@undp/design-system-react/Tooltip';
import { P } from '@undp/design-system-react/Typography';
import { CHART_PADDING } from '@/constants';
import disaggregation from '@/data/sdg16-progress/disaggregation.json';
import ChartNote from '@/routes/chapters/components/ChartNote';

const CATEGORIES = [
  'Sex',
  'Age',
  'Disability',
  'Population group',
  'Location',
  'Education',
  'Income',
];

const COLUMNS = ['Indicator', 'Countries'];

export default function DisaggregationTable() {
  return (
    <div className='flex flex-col gap-4' style={{ padding: CHART_PADDING }}>
      <div>
        <P marginBottom='2xs' className='font-heading font-semibold leading-sm'>
          Number of countries reporting at least one year with disaggregated data
        </P>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          2015–2025
        </P>
      </div>

      <ColorLegend
        colors={['var(--tertiary)', 'var(--secondary)', 'var(--primary)', 'transparent']}
        colorDomain={[
          'Good — recommended & reported',
          'Gap — recommended but not reported',
          'Beyond — reported though not recommended',
          'Not recommended, not reported',
        ]}
        showNAColor={false}
        className='[&_div.rounded-full]:border [&_div.rounded-full]:border-gray-500'
      />

      <div className='overflow-x-auto'>
        <table className='w-full min-w-160 table-fixed text-left text-sm'>
          <colgroup>
            <col className='w-32' />
            <col className='w-32' />
          </colgroup>
          <thead>
            <tr className='text-content-secondary text-xs uppercase tracking-wider'>
              {[...COLUMNS, ...CATEGORIES].map((column) => (
                <th key={column} scope='col' className='pb-3 pl-2 font-semibold'>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {disaggregation.map((row) => (
              <tr key={row.indicator} className='border-content-reverse border-t'>
                <th scope='row' className='py-2 pl-2 font-semibold'>
                  <TooltipProvider delayDuration={100} skipDelayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger className='cursor-help underline decoration-dotted underline-offset-4'>
                        {row.indicator}
                      </TooltipTrigger>
                      <TooltipContent className='max-w-xs'>{row.description}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </th>
                <td className='py-2 pl-2 text-content-secondary'>{row.countries}</td>
                {CATEGORIES.map((category) => {
                  const cell = row.cells.find((entry) => entry.category === category);
                  return (
                    <td
                      key={category}
                      className={
                        cell?.state === 'good'
                          ? 'bg-tertiary text-white'
                          : cell?.state === 'gap'
                            ? 'bg-secondary text-white'
                            : cell?.state === 'beyond'
                              ? 'bg-primary text-white'
                              : 'text-content-quaternary'
                      }
                    >
                      <P marginBottom='none' size='sm' className='py-2 pl-2'>
                        {cell?.value}
                      </P>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <P marginBottom='none' size='sm' className='text-content-secondary'>
        Source: UNSD, Global SDG Indicator Database
      </P>

      <ChartNote
        content={
          <P marginBottom='none' size='sm'>
            The table reports the number of countries and territories providing at least one
            observation with each type of disaggregation for each SDG 16 indicator, based on data
            from the SDG database. Countries are counted once per indicator regardless of years
            reported.
            <br />
            <br />
            Age excludes aggregate ("ALLAGE") and unspecified ("_U") values. Disability includes
            "PD" and "PWD". Population group includes "POP_A", "POP_B", "POP_C". Location includes
            "URBAN" and "RURAL". Education includes "AGG_5T8", "SECOND", "PRIMARY".
            <br />
            <br />
            Some indicators combine multiple SeriesCodes from the SDG database into one figure,
            where series measure components of the same indicator or share a reporting mechanism:
            VC_VAW_MTUHRA/VC_VOC_ENFDIS → 16.10.1; six violence prevalence series → 16.1.3; six
            violence reporting rate series → 16.3.1; four service satisfaction series → 16.6.2. A
            country counts as disaggregated for a combined indicator if any constituent series
            reports it — so combined-indicator counts aren't directly comparable to single-series
            counts.
            <br />
            <br />
            Indicators 16.4.1, 16.4.2, 16.5.2, 16.6.1, 16.8.1, 16.10.2, 16.a.1 were excluded as it
            aggregates financial/administrative/institutional measures, not applicable to
            demographic disaggregation. Indicator 16.7.1a was excluded due to being populated by a
            cluster of distinct series in the SDG database, not one raw disaggregable dataset.
          </P>
        }
      />
    </div>
  );
}
