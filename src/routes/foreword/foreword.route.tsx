import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';

export default function createForewordRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/foreword',
    getParentRoute: () => parentRoute,
  }).lazy(() => import('./foreword.lazy').then((d) => d.Route));
}
