import { Badge } from '@undp/design-system-react/Badge';
import { P } from '@undp/design-system-react/Typography';
import InfoTooltip from '../../components/InfoTooltip';

export default function CrimeRelatedIFFsCards() {
  return (
    <div className='grid auto-rows-fr gap-4 bg-white md:grid-cols-2'>
      <div className='flex flex-col gap-3 bg-background-soft p-6'>
        <P marginBottom='none' size='xl' weight='semibold' className='font-heading leading-sm'>
          Myanmar
        </P>
        <P marginBottom='none' size='sm'>
          <InfoTooltip
            trigger='US$564 million to US$974 million'
            content='UNODC, Myanmar Opium Survey 2025: Cultivation, Production and Implications (United Nations publication, 2025).'
            color='secondary'
          />{' '}
          in potential inward IFFs in 2025, equivalent to 0.8 to 1.3 per cent of GDP.
        </P>
        <div className='mt-auto flex flex-col gap-2'>
          <P
            size='xs'
            marginBottom='none'
            weight='semibold'
            className='mt-2 text-content-secondary uppercase tracking-wider'
          >
            Illicit market
          </P>
          <div className='flex flex-wrap content-start items-start gap-2'>
            <Badge variant='outline' size='sm' rounded='md'>
              opiates
            </Badge>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-3 bg-background-soft p-6'>
        <P marginBottom='none' size='xl' weight='semibold' className='font-heading leading-sm'>
          Balkan route
        </P>
        <P marginBottom='none' size='sm'>
          <InfoTooltip
            trigger='US$3.4 billion to US$6.9 billion'
            content='UNODC, Opiates and Methamphetamine Trafficking on the Balkan Route: Drug Flows, Illicit Incomes and Illicit Financial Flows (United Nations publication, 2025).'
            color='secondary'
          />{' '}
          generated annually between 2019 and 2022.
        </P>
        <div className='mt-auto flex flex-col gap-2'>
          <P
            size='xs'
            marginBottom='none'
            weight='semibold'
            className='mt-2 text-content-secondary uppercase tracking-wider'
          >
            Illicit market
          </P>
          <div className='flex flex-wrap content-start items-start gap-2'>
            <Badge variant='outline' size='sm' rounded='md'>
              opiates
            </Badge>
            <Badge variant='outline' size='sm' rounded='md'>
              methamphetamine
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
