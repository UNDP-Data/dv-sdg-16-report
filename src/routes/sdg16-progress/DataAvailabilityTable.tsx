import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@undp/design-system-react/Tooltip';
import { P } from '@undp/design-system-react/Typography';
import { CHART_PADDING } from '@/constants';
import dataAvailability from '@/data/sdg16-progress/data-availability.json';

interface ChapterColumnProps {
  label: string;
  color: string;
  chapter: string;
}

function ChapterColumn({ label, color, chapter }: ChapterColumnProps) {
  const rows = dataAvailability.filter((row) => row.chapter === chapter);

  return (
    <div className='flex flex-col gap-2'>
      <P
        marginBottom='none'
        size='sm'
        weight='semibold'
        className='uppercase tracking-wider'
        style={{ color }}
      >
        {label}
      </P>
      <table className='w-full table-fixed border-collapse text-sm'>
        <colgroup>
          <col className='w-20' />
          <col />
          <col className='w-14' />
        </colgroup>
        <tbody>
          {rows.map((row) => (
            <tr key={row.indicator} className='border-content-reverse border-t'>
              <th scope='row' className='py-2 pr-3 font-semibold'>
                <TooltipProvider delayDuration={100} skipDelayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger className='cursor-help underline decoration-dotted underline-offset-4'>
                      {row.indicator}
                    </TooltipTrigger>
                    <TooltipContent className='max-w-xs'>{row.description}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </th>
              <td className='py-2 pr-3'>
                <div
                  aria-hidden='true'
                  className='h-3 w-full overflow-hidden bg-stroke-sm'
                  title={`${row.value}%`}
                >
                  <div
                    className='h-full'
                    style={{ width: `${row.value}%`, backgroundColor: color }}
                  />
                </div>
              </td>
              <td className='py-2 text-right'>{row.value}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DataAvailabilityTable() {
  return (
    <div className='flex flex-col gap-4' style={{ padding: CHART_PADDING }}>
      <div className='flex flex-col'>
        <P marginBottom='2xs' className='font-heading font-semibold leading-sm'>
          Countries with Goal 16 data for at least one year since 2015, by indicator
        </P>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          Average across countries, per cent
        </P>
      </div>

      <div className='grid grid-cols-1 gap-x-16 md:grid-cols-3'>
        <ChapterColumn label='Peace' chapter='peace' color='var(--primary)' />
        <ChapterColumn label='Justice' chapter='justice' color='var(--secondary)' />
        <ChapterColumn label='Inclusion' chapter='inclusion' color='var(--tertiary)' />
      </div>

      <P marginBottom='none' size='sm' className='text-content-secondary'>
        Source: UNSD, Global SDG Indicator Database
      </P>
    </div>
  );
}
