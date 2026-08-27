import { type AnyRootRoute, createRoute } from '@tanstack/react-router';
import { Container } from '@undp/design-system-react/Container';
import { H1, P } from '@undp/design-system-react/Typography';

function App() {
  return (
    <Container
      backgroundColor='foreground'
      width='full'
      padding='none'
      className='flex h-auto min-h-[calc(100vh-65px)] flex-col bg-center bg-cover px-6 md:h-[calc(100vh-65px)] md:px-20'
      style={{ backgroundImage: `url('imgs/hero-bg.webp')` }}
    >
      <div className='flex grow items-center'>
        <Container className='md:w-1/2 lg:w-1/3'>
          <P
            size='sm'
            marginBottom='lg'
            className='text-content-quaternary uppercase tracking-wider'
          >
            SDG 16 Report 2026
          </P>
          <H1
            marginBottom='sm'
            weight='medium'
            className='justify-start text-content-reverse normal-case'
          >
            Peace, Justice, Inclusion
          </H1>
          <P size='xl' className='text-content-reverse'>
            A global look at where the world stands on building peaceful, just, and inclusive
            societies — and how far there is left to go.
          </P>
        </Container>
      </div>

      <div className='flex flex-wrap items-center gap-x-10 border-content-reverse/20 border-t py-4'>
        <P size='sm' marginBottom='none' className='text-content-quaternary'>
          In partnership with
        </P>
        <img
          src='/imgs/logos/ohchr_w.svg'
          alt='United Nations Human Rights, Office of the High Commissioner'
          className='h-22'
        />
        <img
          src='/imgs/logos/undp_w.svg'
          alt='United Nations Development Programme'
          className='h-26'
        />
        <img src='/imgs/logos/unicef_w.svg' alt='UNICEF, for every child' className='h-23' />
        <img
          src='/imgs/logos/unodc_w.svg'
          alt='United Nations Office on Drugs and Crime'
          className='h-24'
        />
      </div>
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
