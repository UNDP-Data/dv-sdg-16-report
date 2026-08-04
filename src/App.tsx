import { type AnyRootRoute, createRoute } from '@tanstack/react-router';
import { Container } from '@undp/design-system-react/Container';
import { H2, P } from '@undp/design-system-react/Typography';

function App() {
  return (
    <Container
      backgroundColor='custom'
      width='full'
      padding='none'
      className='flex h-[100vh] items-center bg-center bg-cover px-20'
      style={{ backgroundImage: `url('imgs/hero-bg.webp')` }}
    >
      <Container width='sm'>
        <P size='sm' className='text-gray-300 uppercase tracking-widest'>
          SDG 16 Report 2026
        </P>
        <H2
          marginBottom='sm'
          className="justify-start font-['Newsreader'] font-medium text-8xl! text-slate-200 normal-case leading-[93.50px]"
        >
          Peace, Justice, Inclusivity
        </H2>
        <P size='lg' className='max-w-xl text-gray-300'>
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
