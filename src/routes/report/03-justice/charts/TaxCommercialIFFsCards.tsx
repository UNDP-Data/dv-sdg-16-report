import { Badge } from '@undp/design-system-react/Badge';
import { P } from '@undp/design-system-react/Typography';

export default function TaxCommercialIFFsCards() {
  return (
    <div className='grid auto-rows-fr gap-4 bg-white md:grid-cols-2'>
      <div className='flex flex-col gap-3 bg-background-soft p-6'>
        <P marginBottom='none' size='xl' weight='semibold' className='font-heading leading-sm'>
          Burkina Faso
        </P>
        <P marginBottom='none' size='sm'>
          <span className='text-secondary'>US$319 million</span> in estimated outflows linked to
          selected exports.
        </P>
        <div className='mt-auto flex flex-col gap-2'>
          <P
            size='xs'
            marginBottom='none'
            weight='semibold'
            className='mt-2 text-content-secondary uppercase tracking-wider'
          >
            Export sectors
          </P>
          <div className='flex flex-wrap content-start items-start gap-2'>
            <Badge variant='outline' size='sm' rounded='md'>
              mineral oils
            </Badge>
            <Badge variant='outline' size='sm' rounded='md'>
              gold
            </Badge>
            <Badge variant='outline' size='sm' rounded='md'>
              beverages
            </Badge>
            <Badge variant='outline' size='sm' rounded='md'>
              oil seeds
            </Badge>
            <Badge variant='outline' size='sm' rounded='md'>
              fruits
            </Badge>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-3 bg-background-soft p-6'>
        <P marginBottom='none' size='xl' weight='semibold' className='font-heading leading-sm'>
          Ghana
        </P>
        <P marginBottom='none' size='sm'>
          <span className='text-secondary'>Several billions</span> of IFFs linked to exports.
        </P>
        <div className='mt-auto flex flex-col gap-2'>
          <P
            size='xs'
            marginBottom='none'
            weight='semibold'
            className='mt-2 text-content-secondary uppercase tracking-wider'
          >
            Export sectors
          </P>
          <div className='flex flex-wrap content-start items-start gap-2'>
            <Badge variant='outline' size='sm' rounded='md'>
              gold
            </Badge>
            <Badge variant='outline' size='sm' rounded='md'>
              cocoa
            </Badge>
            <Badge variant='outline' size='sm' rounded='md'>
              oil
            </Badge>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-3 bg-background-soft p-6'>
        <P marginBottom='none' size='xl' weight='semibold' className='font-heading leading-sm'>
          Gabon
        </P>
        <P marginBottom='none' size='sm'>
          Trade mis-invoicing IFFs concentrated in export sectors.
        </P>
        <div className='mt-auto flex flex-col gap-2'>
          <P
            size='xs'
            marginBottom='none'
            weight='semibold'
            className='mt-2 text-content-secondary uppercase tracking-wider'
          >
            Export sectors
          </P>
          <div className='flex flex-wrap content-start items-start gap-2'>
            <Badge variant='outline' size='sm' rounded='md'>
              oil
            </Badge>
            <Badge variant='outline' size='sm' rounded='md'>
              timber
            </Badge>
            <Badge variant='outline' size='sm' rounded='md'>
              mining
            </Badge>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-3 bg-background-soft p-6'>
        <P marginBottom='none' size='xl' weight='semibold' className='font-heading leading-sm'>
          Zambia
        </P>
        <P marginBottom='none' size='sm'>
          IFFs are concentrated in
        </P>
        <div className='mt-auto flex flex-col gap-2'>
          <P
            size='xs'
            marginBottom='none'
            weight='semibold'
            className='mt-2 text-content-secondary uppercase tracking-wider'
          >
            Export sectors
          </P>
          <div className='flex flex-wrap content-start items-start gap-2'>
            <Badge variant='outline' size='sm' rounded='md'>
              copper
            </Badge>
            <Badge variant='outline' size='sm' rounded='md'>
              gold
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
