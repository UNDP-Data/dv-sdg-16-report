import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';

export function Justice() {
  return (
    <>
      Placeholder content for the Justice chapter. This page is a placeholder and should be replaced
      with the actual content for the Justice chapter. The structure of this page mirrors that of
      the Peace chapter, but the numbers and copy are illustrative only and should be replaced with
      real Justice chapter data and text.
    </>
  );
}

export default function createJusticeRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/chapters/justice',
    component: Justice,
    getParentRoute: () => parentRoute,
  });
}
