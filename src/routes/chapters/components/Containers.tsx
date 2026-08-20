import { cn } from '@undp/design-system-react/cn';
import React from 'react';

const GRAPH_CONTAINER_MAX_WIDTH = {
  base: 'max-w-2xl md:max-w-176 lg:max-w-180',
  lg: 'max-w-2xl md:max-w-240 lg:max-w-320',
} as const;

export const GraphContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    isGenderLensActive?: boolean;
    size?: keyof typeof GRAPH_CONTAINER_MAX_WIDTH;
  }
>(({ className, isGenderLensActive = false, size = 'base', ...props }, ref) => {
  return (
    <div
      className={cn(
        'mx-auto my-4 w-full',
        GRAPH_CONTAINER_MAX_WIDTH[size],
        isGenderLensActive && 'gender-lens',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

export const TextContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { isGenderLensActive?: boolean }
>(({ className, isGenderLensActive = false, ...props }, ref) => {
  return (
    <div className='mx-auto w-full max-w-2xl md:max-w-176 lg:max-w-180'>
      <div
        className={cn(
          'mx-4 flex flex-col gap-4 md:mx-8 lg:mx-16',
          isGenderLensActive && 'gender-lens',
          className,
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export const ImpactStoriesContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div className={cn('px-4 md:px-8 lg:px-16', className)} ref={ref} {...props} />;
});
