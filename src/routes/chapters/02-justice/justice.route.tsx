import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';

export default function createJusticeRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/report/justice',
    getParentRoute: () => parentRoute,
  }).lazy(() => import('./justice.lazy').then((d) => d.Route));
}
