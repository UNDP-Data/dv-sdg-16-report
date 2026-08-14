import { P } from '@undp/design-system-react/Typography';
import { CHART_PADDING } from '@/constants';
import BigNumber from '../../components/BigNumber';

export default function HomicideGenderedPatternsBigNumbers() {
  return (
    <div className='flex flex-col gap-4 bg-background-soft' style={{ padding: CHART_PADDING }}>
      <P marginBottom='none' className='font-heading font-semibold leading-sm'>
        Gendered patterns of homicide
      </P>
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
      <P marginBottom='none' size='sm' className='text-content-secondary'>
        Source: TBA
      </P>
    </div>
  );
}
