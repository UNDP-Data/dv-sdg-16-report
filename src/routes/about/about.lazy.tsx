import { createLazyRoute } from '@tanstack/react-router';
import { H1, P } from '@undp/design-system-react/Typography';
import PlaceholderBlock from '@/components/PlaceholderBlock';

export function About() {
  return (
    <>
      <section
        className='bg-bottom-right bg-cover bg-foreground-soft px-6 py-16 md:px-12 md:py-24'
        style={{ backgroundImage: `url('/imgs/chapters/impact-story-bg.webp')` }}
      >
        <div className='mx-auto flex max-w-300 flex-col gap-4'>
          <P
            marginBottom='none'
            size='sm'
            weight='semibold'
            className='text-content-secondary uppercase tracking-widest'
          >
            Global Progress Report on SDG 16
          </P>
          <H1 marginBottom='sm' className='font-normal text-content-reverse normal-case'>
            About
          </H1>
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

export const Route = createLazyRoute('/about')({
  component: About,
});
