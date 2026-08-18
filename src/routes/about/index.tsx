import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';
import { H1, P } from '@undp/design-system-react/Typography';
import PlaceholderBlock from '@/components/PlaceholderBlock';

export function About() {
  return (
    <>
      <section className='bg-foreground-soft px-6 py-16 md:px-12 md:py-24'>
        <div className='mx-auto flex max-w-300 flex-col gap-4'>
          <P
            marginBottom='none'
            size='sm'
            className='font-semibold text-content-reverse uppercase tracking-widest'
          >
            SDG 16 Report
          </P>
          <H1 marginBottom='sm' className='font-normal text-content-reverse normal-case'>
            About
          </H1>
          <P size='lg' className='max-w-2xl text-content-reverse'>
            The story behind this report — who produced it, and why it matters.
          </P>
        </div>
      </section>

      <section className='mx-auto px-6 py-12 md:px-12 md:py-16'>
        <div className='mx-auto max-w-300'>
          <PlaceholderBlock label='About' title='Content coming soon' />
        </div>
      </section>
    </>
  );
}

export default function createAboutRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/about',
    component: About,
    getParentRoute: () => parentRoute,
  });
}
