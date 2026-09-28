import { forwardRef, type HTMLAttributes } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  flat?: boolean;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', flat = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-card border border-border-subtle rounded-md ${flat ? 'p-0' : 'p-5'} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';
