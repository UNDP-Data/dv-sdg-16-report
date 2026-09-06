import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';

export default function createSDG16ProgressRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/report/sdg16-progress',
    getParentRoute: () => parentRoute,
  }).lazy(() => import('./SDG16Progress.lazy').then((d) => d.Route));
}
