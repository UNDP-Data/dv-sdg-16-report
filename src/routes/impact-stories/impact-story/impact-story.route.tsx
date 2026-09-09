import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';

export default function createImpactStoryRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/impact-stories/$storyId',
    getParentRoute: () => parentRoute,
  }).lazy(() => import('./impact-story.lazy').then((d) => d.Route));
}
