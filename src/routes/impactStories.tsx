import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';
import { H1, P } from '@undp/design-system-react/Typography';
import ImpactStoryCard from '../components/impact-stories/ImpactStoryCard';
import { DARK_BLUE, ROUTES } from '../constants';
import { impactStories } from '../data/impactStories';

export function ImpactStories() {
  return (
    <>
      <section className='px-6 py-16 md:px-12 md:py-24' style={{ backgroundColor: DARK_BLUE }}>
        <div className='mx-auto flex max-w-[1200px] flex-col gap-4'>
          <P
            marginBottom='none'
            size='sm'
            className='font-semibold text-gray-300 uppercase tracking-wide'
          >
            SDG 16 Report
          </P>
          <H1
            marginBottom='sm'
            className='font-normal text-6xl! text-white normal-case md:text-7xl!'
          >
            Impact stories
          </H1>
          <P size='lg' className='max-w-2xl text-gray-300'>
            How data on peace, justice and inclusion is translating into real institutional and
            policy change around the world.
          </P>
        </div>
      </section>

      <section className='mx-auto max-w-[1200px] px-6 py-12 md:px-12 md:py-16'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {impactStories.map((entry) => (
            <ImpactStoryCard key={entry.id} id={entry.id} />
          ))}
        </div>
      </section>
    </>
  );
}

export default function createImpactStoriesRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: ROUTES.impactStories,
    component: ImpactStories,
    getParentRoute: () => parentRoute,
  });
}
