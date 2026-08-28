import { type AnyRootRoute, createRoute } from '@tanstack/react-router';
import { Button } from '@undp/design-system-react/Button';
import { Container } from '@undp/design-system-react/Container';
import { Spacer } from '@undp/design-system-react/Spacer';
import { H1, P } from '@undp/design-system-react/Typography';
import { showNavigation } from './Utils/showNavigation';

function App() {
  return (
    <Container
      backgroundColor='foreground-soft'
      width='full'
      padding='none'
      className='flex h-auto min-h-[calc(100vh-65px)] flex-col bg-center bg-cover px-6 md:h-[calc(100vh-65px)] md:px-20'
      style={{ backgroundImage: `url('imgs/hero-bg.webp')` }}
    >
      <div className='flex grow items-center'>
        <Container className='md:w-1/2'>
          <H1
            marginBottom='sm'
            weight='medium'
            className='justify-start text-content-reverse normal-case'
          >
            Peace, Justice, Inclusion
          </H1>
          {showNavigation() ? (
            <P size='xl' className='text-content-reverse'>
              A global look at where the world stands on building peaceful, just, and inclusive
              societies — and how far there is left to go.
            </P>
          ) : (
            <>
              <P size='xl' className='text-content-reverse' marginBottom='none'>
                This is the official page for the 2026 Global Progress Report on SDG 16, jointly
                produced by OHCHR, UNDP, UNICEF, and UNODC.
                <br />
                <br />
                Discover what the latest data reveal about global progress toward peace, justice,
                and inclusion, and the role of effective institutions in driving sustained change.
                <br />
                <br />
                Join us for the official launch on{' '}
                <strong>23 September 2026, 05:00PM at UNDP 304 E 45th St, New York</strong>
              </P>
              <Spacer size='3xl' />
              <a
                target='_blank'
                rel='noreferrer'
                href='https://forms.cloud.microsoft/pages/responsepage.aspx?id=Xtvls0QpN0iZ9XSIrOVDGU0hVM8DDcBGn_INVU5ric1UMEM0VUpJOVpSSzM4NlZVTjJQWlZDMVAzUy4u&route=shorturl'
              >
                <Button
                  type='button'
                  variant='primary'
                  arrow={false}
                  className='w-fit gap-1.5 bg-secondary px-5 py-3 text-sm transition-colors hover:bg-secondary/90'
                >
                  Sign up to attend the report launch
                </Button>
              </a>
            </>
          )}
        </Container>
      </div>

      <div className='flex flex-wrap items-center gap-x-10 border-content-reverse/20 border-t py-4'>
        <P size='sm' marginBottom='none' className='text-content-quaternary'>
          Produced by
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
