import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';

export default function createJusticeRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/chapters/peace',
    getParentRoute: () => parentRoute,
  }).lazy(() => import('./peace.lazy').then((d) => d.Route));
}
