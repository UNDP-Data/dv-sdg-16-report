import { P } from '@undp/design-system-react/Typography';
import BigNumber from '@/components/BigNumber';
import { CHART_PADDING } from '@/constants';
import ChartNote from '../../components/ChartNote';

export default function HomicideGenderedPatternsBigNumbers() {
  return (
    <div className='flex flex-col gap-4 bg-background-soft' style={{ padding: CHART_PADDING }}>
      <div className='flex flex-col gap-1'>
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Gendered patterns of homicide
        </P>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          2024
        </P>
      </div>
      <div className='flex gap-4'>
        <BigNumber
          className='w-full'
          color='primary'
          value={80}
          suffix='%'
          label='of all homicide victims in 2024 were men'
        />
        <div className='w-full'>
          <BigNumber
            className='pb-2'
            color='primary'
            value={60}
            suffix='%'
            label='of women intentionally killed globally were killed by an intimate partner of family member'
          />
          <div className='w-[50%]'>
            <hr className='border-slate-300' />
            <P className='pt-2'>
              compared with{' '}
              <span className='font-bold font-heading text-3xl text-primary'>11% </span>of men
            </P>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          Source: UNODC estimates based on responses to the United Nations Survey of Crime Trends
          and Operations of Criminal Justice Systems and data from other sources reviewed by Member
          States.
        </P>
        <ChartNote content='Data on the share of intimate partner/family member homicide out of all homicides is not available for SDG regions.' />
      </div>
    </div>
  );
}
