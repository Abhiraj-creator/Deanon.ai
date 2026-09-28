import React from 'react';
import { DeAnonLogo, type DeAnonLogoProps } from './ui/DeAnonLogo';

export interface LogoProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  /** Logo variant: 'full' (icon + text), 'icon' (image mark only), or 'text' (wordmark text only) */
  variant?: 'full' | 'icon' | 'text';
  /** Height of the logo in pixels or string (defaults to 36) */
  size?: number | string;
  /** Set to true to use SVG vector rendering instead of PNG image asset */
  svg?: boolean;
  /** Custom image source path for the logo mark */
  imageSrc?: string;
  /** Custom container styling */
  className?: string;
  /** Text color styling class */
  textColor?: string;
}

/** Official generated transparent logo asset path */
export const LOGO_IMAGE_PATH = '/logo.png';

/**
 * Universal DeAnon.Ai Logo Component
 * 
 * Renders the official transparent PNG logo asset (`/Gemini_Generated_Image_jswl8pjswl8pjswl.png`)
 * or pure SVG vector mark with custom theme support.
 */
export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 36,
  svg = false,
  imageSrc = LOGO_IMAGE_PATH,
  className = '',
  textColor = 'text-text-primary',
  ...props
}) => {
  if (svg) {
    return <DeAnonLogo variant={variant} size={size} className={className} />;
  }

  const heightPx = typeof size === 'number' ? `${size}px` : size;
  const fontPx = typeof size === 'number' ? `${Math.max(Math.round(size * 0.55), 13)}px` : '1rem';

  return (
    <div
      className={`inline-flex items-center  select-none leading-none ${className}`}
      {...props}
    >
      {(variant === 'full' || variant === 'icon') && (
        <img
          src={imageSrc}
          alt="DeAnon.Ai Logo"
          style={{ height: heightPx, width: 'auto' }}
          className="object-contain filter drop-shadow-[0_0_8px_rgba(57,255,104,0.3)] brightness-125 dark:brightness-150 transition-all duration-200 hover:scale-105 shrink-0"
        />
      )}

      {(variant === 'full' || variant === 'text') && (
        <span
          className={`font-sans font-bold tracking-tight uppercase whitespace-nowrap ${textColor}`}
          style={{ fontSize: fontPx }}
        >
          DeAnon<span className="text-accent-solid">.Ai</span>
        </span>
      )}
    </div>
  );
};

export { DeAnonLogo };
export type { DeAnonLogoProps };
export default Logo;
