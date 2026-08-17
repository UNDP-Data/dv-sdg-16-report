import { type AnyRootRoute, createRoute } from '@tanstack/react-router';
import { Container } from '@undp/design-system-react/Container';
import { H1, P } from '@undp/design-system-react/Typography';

function App() {
  return (
    <Container
      backgroundColor='foreground'
      width='full'
      padding='none'
      className='flex h-auto min-h-screen items-center bg-center bg-cover px-6 md:h-screen md:px-20'
      style={{ backgroundImage: `url('imgs/hero-bg.webp')` }}
    >
      <Container className='md:w-1/2 lg:w-1/3'>
        <P size='sm' marginBottom='lg' className='text-content-quaternary uppercase tracking-wider'>
          SDG 16 Report 2026
        </P>
        <H1
          marginBottom='sm'
          weight='normal'
          className='justify-start font-medium! text-content-reverse normal-case'
        >
          Peace, Justice, Inclusivity
        </H1>
        <P size='xl' className='text-content-reverse'>
          A global look at where the world stands on building peaceful, just, and inclusive
          societies — and how far there is left to go.
        </P>
      </Container>
    </Container>
  );
}

export default function createHomeRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/',
    component: App,
    getParentRoute: () => parentRoute,
  });
}
