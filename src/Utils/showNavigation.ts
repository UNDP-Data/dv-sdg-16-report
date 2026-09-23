import { useLocation } from '@tanstack/react-router';

export const showNavigation = () => {
  const { pathname, search } = useLocation();

  return pathname !== '/' || new Date() > new Date('2026-09-23T20:50:00Z') || search.bypassCounter;
};
