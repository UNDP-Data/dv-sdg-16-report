import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';

export default function createTempChartsRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/temp/charts',
    getParentRoute: () => parentRoute,
  }).lazy(() => import('./temp-charts.lazy').then((d) => d.Route));
}
