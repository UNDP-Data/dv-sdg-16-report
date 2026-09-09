import { useQuery } from '@tanstack/react-query';
import { ColorLegend } from '@undp/data-viz/ColorLegend';
import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';
import { Spinner } from '@undp/design-system-react/Spinner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@undp/design-system-react/Tooltip';
import { P } from '@undp/design-system-react/Typography';
import ErrorEl from '@/components/ErrorEl';
import { CHART_PADDING } from '@/constants';
import ChartNote from '../components/ChartNote';

interface DataType {
  indicator: string;
  countries: number | string;
  description: string;
  cells: {
    category: string;
    state: string;
    value: string;
  }[];
}

function useData() {
  return useQuery({
    queryKey: ['sdg-16-progress-disaggregation'],
    queryFn: () =>
      fetchAndParseJSON('/data/report/05-sdg-16-progress/disaggregation.json') as Promise<
        DataType[]
      >,
  });
}

export default function DisaggregationTable() {
  const categories = [
    'Sex',
    'Age',
    'Disability',
    'Population group',
    'Location',
    'Education',
    'Income',
  ];

  const columns = ['Indicator', 'Countries'];
  const { data, isLoading, isError } = useData();

  if (isLoading) return <Spinner size='lg' className='mx-auto my-20' />;
  if (isError) return <ErrorEl />;
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
          'Recommended and reported',
          'Recommended but not reported',
          'Reported though not recommended',
          'Not recommended, not reported',
        ]}
        showNAColor={false}
        className='[&_div.rounded-full]:border [&_div.rounded-full]:border-gray-500'
      />

      <div className='overflow-x-auto'>
        <table className='w-full min-w-280 table-fixed text-left text-sm'>
          <colgroup>
            <col className='w-32' />
            <col className='w-24' />
            {categories.map((category) => (
              <col key={category} className='w-28' />
            ))}
          </colgroup>
          <thead>
            <tr className='text-content-secondary text-xs uppercase tracking-wider'>
              {[...columns, ...categories].map((column) => (
                <th key={column} scope='col' className='pb-3 pl-2 font-semibold'>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((row) => (
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
                {categories.map((category) => {
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
      <div>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          Source: UNSD, Global SDG Indicator Database
        </P>

        <ChartNote
          content={
            <P marginBottom='none' size='sm'>
              The table reports the number of countries and territories providing at least one
              observation with each type of disaggregation for each SDG 16 indicator, based on data
              available in the Global SDG database. Countries are counted only once per indicator,
              regardless of the number of years for which data are reported. It is important to note
              that the absence of disaggregated data in the Global SDG Database does not necessarily
              imply that such data do not exist. For some indicators, counts are calculated by
              aggregating multiple series into a single measure. This approach is used where
              different series capture different components of the same indicator. Examples include
              indicators 16.10.1, 16.1.3, 16.3.1, and 16.6.2. A country is counted as reporting
              disaggregated data on that indicator if any of its underlying series includes the
              relevant disaggregation. Indicators 16.4.1, 16.4.2, 16.5.2, 16.6.1, 16.8.1, 16.10.2,
              16.a.1 were excluded as they are aggregated across financial, administrative or
              institutional measures, and therefore not applicable to demographic disaggregation.
              <br />
              <br />* Metadata recommends reporting on ethnicity/migration background, used as proxy
              for Population Group.
              <br />
              ** Indicator implicitly reports by sex or age (not separately recommended), but as a
              prerequisite for the value.
            </P>
          }
        />
      </div>
    </div>
  );
}
