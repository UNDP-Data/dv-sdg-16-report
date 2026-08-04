import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';
import { ROUTES } from '../../constants';

export function Inclusion() {
  return (
    <>
      Placeholder content for the Inclusion chapter. This page is a placeholder and should be
      replaced with the actual content for the Inclusion chapter. The structure of this page mirrors
      that of the Peace chapter, but the numbers and copy are illustrative only and should be
      replaced with real Inclusion chapter data and text.
    </>
  );
}

export default function createInclusionRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: ROUTES.inclusion,
    component: Inclusion,
    getParentRoute: () => parentRoute,
  });
}
