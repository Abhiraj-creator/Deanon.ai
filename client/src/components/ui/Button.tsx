import { forwardRef, type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', children, className = '', ...props }, ref) => {
    const baseStyle = "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-gradient-to-r from-accent-start to-accent-end text-white shadow-[0_0_15px_rgba(109,94,245,0.35)] hover:shadow-[0_0_20px_rgba(109,94,245,0.5)] border-none h-10 px-4",
      secondary: "bg-transparent border border-border-subtle hover:border-accent-border text-text-primary h-10 px-4",
      ghost: "bg-transparent border-none hover:bg-card-hover text-text-secondary w-8 h-8 rounded-md p-1",
    };

    return (
      <button ref={ref} className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

