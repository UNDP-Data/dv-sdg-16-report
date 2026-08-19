import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';

export default function createImpactStoriesRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/impact-stories',
    getParentRoute: () => parentRoute,
  }).lazy(() => import('./impact-stories.lazy').then((d) => d.Route));
}
