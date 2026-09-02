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
        <BigNumber color='blue-500' value={38} suffix='%' label='no substantive response' />
        <BigNumber color='blue-500' value={54} suffix='%' label='at least some information' />
        <BigNumber color='blue-500' value={42} suffix='%' label='full disclosure' />
      </div>

      <P marginBottom='none' size='sm' className='text-content-secondary'>
        Source: Mendel, T. and Vagliano, R. (2025) Global Comparative Testing of Responses to
        Requests for Information. Halifax, NS: Centre for Law and Democracy. Available at:{' '}
        <a
          href='https://www.law-democracy.org/wp-content/uploads/2026/02/IDUAI.report.25-09-26.pdf'
          target='_blank'
          className='underline'
          rel='noopener noreferrer'
        >
          https://www.law-democracy.org/wp-content/uploads/2026/02/IDUAI.report.25-09-26.pdf
        </a>
      </P>
    </div>
  );
}
