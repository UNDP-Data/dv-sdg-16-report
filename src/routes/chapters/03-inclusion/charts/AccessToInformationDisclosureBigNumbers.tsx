import { P } from '@undp/design-system-react/Typography';
import BigNumber from '@/components/BigNumber';
import { CHART_PADDING } from '@/constants';

export default function AccessToInformationDisclosureBigNumbers() {
  return (
    <div className='flex flex-col gap-6 bg-background-soft' style={{ padding: CHART_PADDING }}>
      <div className='flex flex-col gap-1'>
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          How do access to information laws function in practice?
        </P>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          Across 76 countries
        </P>
      </div>

      <div className='grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-3 md:gap-x-10'>
        <BigNumber color='tertiary' value={38} suffix='%' label='no substantive response' />
        <BigNumber color='tertiary' value={54} suffix='%' label='at least some information' />
        <BigNumber color='tertiary' value={42} suffix='%' label='full disclosure' />
      </div>

      <P marginBottom='none' size='sm' className='text-content-secondary'>
        Source: TBA
      </P>
    </div>
  );
}
