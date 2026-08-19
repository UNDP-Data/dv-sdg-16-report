import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';

export default function createJusticeRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/chapters/inclusion',
    getParentRoute: () => parentRoute,
  }).lazy(() => import('./inclusion.lazy').then((d) => d.Route));
}
