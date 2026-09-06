import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';

export default function createReportRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/report',
    getParentRoute: () => parentRoute,
  }).lazy(() => import('./report.lazy').then((d) => d.Route));
}
