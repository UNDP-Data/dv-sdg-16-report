import { P } from '@undp/design-system-react/Typography';

export default function ErrorEl() {
  return (
    <P marginBottom='none' size='sm' className='text-content-secondary'>
      Unable to load the underlying data for this chart.
    </P>
  );
}
