import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';
import { H1, P } from '@undp/design-system-react/Typography';
import PlaceholderBlock from '@/routes/chapters/components/PlaceholderBlock';

export function Materials() {
  return (
    <>
      <section className='bg-foreground-soft px-6 py-16 md:px-12 md:py-24'>
        <div className='mx-auto flex max-w-300 flex-col gap-4'>
          <P
            marginBottom='none'
            size='sm'
            className='font-semibold text-surface-sm uppercase tracking-widest'
          >
            SDG 16 Report
          </P>
          <H1 marginBottom='sm' className='font-normal text-content-reverse normal-case'>
            Materials
          </H1>
          <P size='lg' className='max-w-2xl text-surface-sm'>
            Downloadable data, methodology notes and supporting resources behind the report.
          </P>
        </div>
      </section>

      <section className='mx-auto px-6 py-12 md:px-12 md:py-16'>
        <div className='mx-auto max-w-300'>
          <PlaceholderBlock label='Materials' title='Content coming soon' />
        </div>
      </section>
    </>
  );
}

export default function createMaterialsRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/materials',
    component: Materials,
    getParentRoute: () => parentRoute,
  });
}
