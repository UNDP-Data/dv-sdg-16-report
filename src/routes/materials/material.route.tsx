import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';

export default function createImpactStoriesRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/materials',
    getParentRoute: () => parentRoute,
  }).lazy(() => import('./materials.lazy').then((d) => d.Route));
}
