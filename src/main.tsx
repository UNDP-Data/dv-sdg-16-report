import { createRootRoute, createRouter, Outlet, RouterProvider } from '@tanstack/react-router';
import { ConfigProvider } from '@undp/design-system-react/ConfigProvider';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import createHomeRoute from './App';
import FooterEl from './components/Footer';
import GenderLensNav from './components/GenderLensNav';
import HeaderEl from './components/Header';
import { FONT_BODY, FONT_HEADING } from './constants';
import * as TanStackQueryProvider from './integration/tanstack-query';
import createInclusionRoute from './routes/chapters/inclusion';
import createJusticeRoute from './routes/chapters/justice';
import createPeaceRoute from './routes/chapters/peace';
import createImpactStoriesRoute from './routes/impactStories';

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
      <main className='flex grow-1 flex-col justify-center'>
        <Outlet />
      </main>
      <FooterEl />
      <GenderLensNav />
    </div>
  ),
});

const routeTree = rootRoute.addChildren([
  createHomeRoute(rootRoute),
  createPeaceRoute(rootRoute),
  createJusticeRoute(rootRoute),
  createInclusionRoute(rootRoute),
  createImpactStoriesRoute(rootRoute),
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
      <ConfigProvider config={{ fonts: { heading: FONT_HEADING, body: FONT_BODY } }}>
        <TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
          <RouterProvider router={router} />
        </TanStackQueryProvider.Provider>
      </ConfigProvider>
    </StrictMode>,
  );
}
