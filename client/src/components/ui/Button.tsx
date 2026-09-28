import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md';
  showArrow?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, className = '', showArrow = false, ...props }, ref) => {
    const baseStyle =
      'group inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary:
        'bg-transparent border border-accent-border text-text-primary hover:border-accent-solid hover:bg-accent-soft/30',
      secondary:
        'bg-transparent border border-border-subtle hover:border-border-strong text-text-secondary hover:text-text-primary',
      ghost: 'bg-transparent border-none hover:bg-card-hover text-text-secondary w-8 h-8 rounded-md p-1',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
    };

    return (
      <button ref={ref} className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
        {children}
        {showArrow && (
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
