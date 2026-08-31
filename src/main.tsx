import { createRootRoute, createRouter, Outlet, RouterProvider } from '@tanstack/react-router';
import { ConfigProvider } from '@undp/design-system-react/ConfigProvider';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import createHomeRoute from './App';
import FooterEl from './components/Footer';
import HeaderEl from './components/Header';
import * as TanStackQueryProvider from './integration/tanstack-query';
import createAboutRoute from './routes/about/about.route';
import createPeaceRoute from './routes/chapters/01-peace/peace.route';
import createJusticeRoute from './routes/chapters/02-justice/justice.route';
import createInclusionRoute from './routes/chapters/03-inclusion/inclusion.route';
import createForewordRoute from './routes/foreword/foreword.route';
import createImpactStoriesRoute from './routes/impact-stories/impact-stories.route';
import createResourcesRoute from './routes/resources/resources.route';
import createSDG16ProgressRoute from './routes/sdg16-progress/SDG16Progress.route';

import './styles/fonts.css';
import './styles/style.css';

const rootRoute = createRootRoute({
  component: () => (
    <div className='flex min-h-screen flex-col gap-0 antialiased'>
      <div
        className="mix-blend-multiply! pointer-events-none fixed inset-0 z-10 bg-[url('/imgs/texture.png')] bg-repeat opacity-[0.05]"
        style={{ backgroundSize: '120px 120px' }}
      />
      <HeaderEl />
      <main className='flex grow flex-col justify-start'>
        <Outlet />
      </main>
      <FooterEl />
    </div>
  ),
});

const routeTree = rootRoute.addChildren([
  createHomeRoute(rootRoute),
  createForewordRoute(rootRoute),
  createPeaceRoute(rootRoute),
  createJusticeRoute(rootRoute),
  createInclusionRoute(rootRoute),
  createSDG16ProgressRoute(rootRoute),
  createImpactStoriesRoute(rootRoute),
  createResourcesRoute(rootRoute),
  createAboutRoute(rootRoute),
]);

const TanStackQueryProviderContext = TanStackQueryProvider.getContext();
const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProviderContext,
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ConfigProvider
        config={{
          fonts: {
            heading: 'Newsreader',
            body: 'Hanken Grotesk',
          },
          fontSize: {
            h4: { base: '2.5rem' },
            h5: { base: '1.75rem' },
          },
          primary: {
            base: '#42A1D8',
            hover: '#42A1D8',
            light: '#42A1D8',
          },
          secondary: {
            base: '#E56842',
            hover: '#E56842',
            light: '#E56842',
          },
          tertiary: {
            base: '#05AA8E',
            hover: '#05AA8E',
            light: '#05AA8E',
          },
          quaternary: {
            base: '#7b6fe8',
            hover: '#7b6fe8',
            light: '#7b6fe8',
          },
          foreground: '#141d25',
          foregroundSoft: '#142338',
          backgroundSoft: '#f5f9fc',
          content: {
            reverse: '#DCE6F0',
            secondary: '#60758a',
            quaternary: '#A0B1C1',
          },
          teal: {
            200: '#AED1D0',
            400: '#00AAA3',
            600: '#05AA8E',
          },
          violet: {
            200: '#C4DAEF',
            400: '#316DA8',
            600: '#316DA8',
          },
          blue: {
            600: '#0479b5',
            100: '#EEF3F8',
            200: '#E1EAF2',
            500: '#2B73B6',
            600: '#2F5E8F',
            700: '#274F79',
          },
        }}
      >
        <TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
          <RouterProvider router={router} />
        </TanStackQueryProvider.Provider>
      </ConfigProvider>
    </StrictMode>,
  );
}
