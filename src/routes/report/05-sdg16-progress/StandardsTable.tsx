import { useQuery } from '@tanstack/react-query';
import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';
import { Badge } from '@undp/design-system-react/Badge';
import { Spinner } from '@undp/design-system-react/Spinner';
import { P } from '@undp/design-system-react/Typography';
import ErrorEl from '@/components/ErrorEl';
import { CHART_PADDING } from '@/constants';

type DataType = {
  year: string;
  publication: string;
  targets: string[];
};

function useData() {
  return useQuery({
    queryKey: ['sdg-16-progress-standards'],
    queryFn: () =>
      fetchAndParseJSON('/data/report/05-sdg-16-progress/standards.json') as Promise<DataType[]>,
  });
}

export default function StandardsTable() {
  const { data, isLoading, isError } = useData();

  if (isLoading) return <Spinner size='lg' className='mx-auto my-20' />;
  if (isError) return <ErrorEl />;
  return (
    <div className='flex flex-col gap-4' style={{ padding: CHART_PADDING }}>
      <P marginBottom='none' className='font-heading font-semibold leading-sm'>
        Standards, classification and methodological products
      </P>

      <div className='undp-scrollbar max-h-100 overflow-auto'>
        <table className='w-full min-w-160 table-fixed text-left text-sm'>
          <colgroup>
            <col className='w-20' />
            <col />
            <col className='w-72' />
          </colgroup>
          <thead className='sticky top-0 bg-background-soft'>
            <tr className='text-content-secondary text-xs uppercase tracking-wider'>
              <th scope='col' className='pb-3 font-semibold'>
                Year
              </th>
              <th scope='col' className='pb-3 font-semibold'>
                Publication
              </th>
              <th scope='col' className='pb-3 font-semibold'>
                Related targets
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((standard) => (
              <tr key={standard.publication} className='border-content-reverse border-t'>
                <th scope='row' className='py-4 pr-6 align-top font-normal text-content-secondary'>
                  {standard.year}
                </th>
                <td className='py-4 pr-6 align-top'>{standard.publication}</td>
                <td className='py-4 align-top'>
                  <div className='flex flex-wrap items-start gap-2'>
                    {standard.targets.map((target) => (
                      <Badge key={target} variant='outline' size='sm' rounded='md'>
                        {target}
                      </Badge>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
