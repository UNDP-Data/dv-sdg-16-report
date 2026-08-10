import { createRootRoute, createRouter, Outlet, RouterProvider } from '@tanstack/react-router';
import { ConfigProvider } from '@undp/design-system-react/ConfigProvider';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import createHomeRoute from './App';
import FooterEl from './components/Footer';
import HeaderEl from './components/Header';
import * as TanStackQueryProvider from './integration/tanstack-query';
import createAboutRoute from './routes/about';
import createPeaceRoute from './routes/chapters/01-peace';
import createJusticeRoute from './routes/chapters/02-justice';
import createInclusionRoute from './routes/chapters/03-inclusion';
import createImpactStoriesRoute from './routes/impact-stories';
import createMaterialsRoute from './routes/materials';

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
  createPeaceRoute(rootRoute),
  createJusticeRoute(rootRoute),
  createInclusionRoute(rootRoute),
  createImpactStoriesRoute(rootRoute),
  createMaterialsRoute(rootRoute),
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
          primary: {
            base: '#42A1D8',
            hover: '#42A1D8',
            light: '#42A1D8',
          },
          secondary: {
            base: '#E2501F',
            hover: '#E2501F',
            light: '#E2501F',
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
          foregroundSoft: '#061932',
        }}
      >
        <TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
          <RouterProvider router={router} />
        </TanStackQueryProvider.Provider>
      </ConfigProvider>
    </StrictMode>,
  );
}
