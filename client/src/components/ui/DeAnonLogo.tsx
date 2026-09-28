import React from 'react';

export interface DeAnonLogoProps extends React.SVGProps<SVGSVGElement> {
  /** Logo variant: 'full' (icon + text), 'icon' (mark only), or 'text' (wordmark only) */
  variant?: 'full' | 'icon' | 'text';
  /** Height or width of the logo (numeric pixel value or CSS string) */
  size?: number | string;
  /** Primary text & frame color (defaults to 'currentColor' for dark/light theme adaptability) */
  color?: string;
  /** Accent color for the quantum central node (defaults to vivid blue '#2563EB') */
  accentColor?: string;
  /** Enable subtle pulse / glow animations on the central neural node */
  animated?: boolean;
}

/**
 * DeAnon.Ai Official High-Detail Vector SVG Logo Component
 * 
 * Recreated with mathematical precision from the original brand mark:
 * - Geometric monogram of 'D' & 'A' integrated with an internal quantum neural graph.
 * - Central illuminated glowing node in electric blue (#2563EB / #60A5FA).
 * - Multi-node constellation network with interconnected data-stream vectors.
 * - Precision-kerned geometric sans-serif typography for "DeAnon.Ai".
 */
export const DeAnonLogo: React.FC<DeAnonLogoProps> = ({
  variant = 'full',
  size = 40,
  color = 'currentColor',
  accentColor = '#2563EB',
  animated = false,
  className = '',
  style,
  ...props
}) => {
  // Dimension calculations based on variant
  const getDimensions = () => {
    if (typeof size === 'number') {
      if (variant === 'icon') return { width: size, height: size };
      if (variant === 'text') return { width: size * 3.2, height: size };
      return { width: size * 4.2, height: size };
    }
    return { width: size, height: size };
  };

  const { width, height } = getDimensions();

  // SVG viewBox configurations
  // Icon Mark: 0 0 140 140
  // Full Logo: 0 0 600 140
  // Text Only: 160 0 435 140
  const getViewBox = () => {
    if (variant === 'icon') return '0 0 140 140';
    if (variant === 'text') return '160 0 435 140';
    return '0 0 600 140';
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={getViewBox()}
      width={width}
      height={height}
      className={`inline-block select-none ${className}`}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        overflow: 'visible',
        ...style,
      }}
      role="img"
      aria-label="DeAnon.Ai Logo"
      {...props}
    >
      <defs>
        {/* Central Node Radial Gradient Glow */}
        <radialGradient id="deanon-node-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#93C5FD" stopOpacity="1" />
          <stop offset="40%" stopColor={accentColor} stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0" />
        </radialGradient>

        {/* Linear Gradient for Text Subtlety if desired */}
        <linearGradient id="deanon-text-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="currentColor" />
          <stop offset="100%" stopColor="currentColor" />
        </linearGradient>

        {/* Pulse Keyframe Animation */}
        {animated && (
          <style>{`
            @keyframes deanonPulse {
              0%, 100% { transform: scale(1); opacity: 0.95; }
              50% { transform: scale(1.25); opacity: 1; filter: drop-shadow(0 0 6px ${accentColor}); }
            }
            @keyframes deanonScan {
              0% { stroke-dashoffset: 40; }
              100% { stroke-dashoffset: 0; }
            }
            .deanon-pulse-node {
              transform-origin: 65px 70px;
              animation: deanonPulse 2.8s ease-in-out infinite;
            }
          `}</style>
        )}
      </defs>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 1. ICON MARK (MONOGRAM 'DA' + QUANTUM NEURAL NETWORK GRAPH)    */}
      {/* ───────────────────────────────────────────────────────────── */}
      {(variant === 'full' || variant === 'icon') && (
        <g id="DeAnon-Mark">
          {/* Outer Heavy Frame - Dark Monogram Structure 'D' & 'A' */}
          <g fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round">
            {/* Main Outer Boundary Lines (Thick Frame) */}
            <path
              d="M 15 12 L 55 12 L 108 12 L 132 128 L 110 128 L 55 128 L 15 128 Z"
              strokeWidth="10"
            />

            {/* Left Vertical 'D' Outer Wall & Chevron Notch */}
            <path
              d="M 15 12 L 15 128 M 15 42 L 42 70 L 15 98"
              strokeWidth="9"
            />

            {/* Right 'A' Inner Triangle Cutout & Crossbar */}
            <path
              d="M 108 12 L 55 128 M 108 12 L 132 128 M 84 70 L 120 70"
              strokeWidth="8"
            />

            {/* Major Facet Diagonals Connecting the Frame */}
            <path
              d="M 15 12 L 132 128 M 15 128 L 108 12 M 42 70 L 120 70"
              strokeWidth="6"
            />
          </g>

          {/* Inner Neural Network Spoke Lines (Fine Data Connectors) */}
          <g fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.9">
            {/* Radial Lines from Central Node (65, 70) to Outer Vertices */}
            <line x1="65" y1="70" x2="15" y2="12" />
            <line x1="65" y1="70" x2="15" y2="128" />
            <line x1="65" y1="70" x2="42" y2="70" />
            <line x1="65" y1="70" x2="55" y2="12" />
            <line x1="65" y1="70" x2="55" y2="128" />
            <line x1="65" y1="70" x2="108" y2="12" />
            <line x1="65" y1="70" x2="132" y2="128" />
            <line x1="65" y1="70" x2="120" y2="70" />

            {/* Constellation Web Cross-lines between peripheral nodes */}
            <line x1="42" y1="70" x2="36" y2="38" />
            <line x1="42" y1="70" x2="36" y2="102" />
            <line x1="86" y1="40" x2="120" y2="70" />
            <line x1="98" y1="99" x2="120" y2="70" />
          </g>

          {/* Secondary Peripheral Nodes (Dark Filled Network Circles) */}
          <g fill={color}>
            <circle cx="36" cy="38" r="4.5" />
            <circle cx="42" cy="70" r="4.5" />
            <circle cx="36" cy="102" r="4.5" />
            <circle cx="55" cy="12" r="3.5" />
            <circle cx="55" cy="128" r="3.5" />
            <circle cx="86" cy="40" r="4.5" />
            <circle cx="98" cy="99" r="4.5" />
            <circle cx="120" cy="70" r="5" />
          </g>

          {/* Central Quantum Neural Node (Bright Blue Core with Dark Ring) */}
          <g className={animated ? 'deanon-pulse-node' : ''}>
            {/* Soft Ambient Glow Backlight */}
            <circle cx="65" cy="70" r="16" fill="url(#deanon-node-glow)" opacity="0.75" />
            {/* Outer Navy Ring */}
            <circle cx="65" cy="70" r="11" fill={color} />
            {/* Vivid Blue Core */}
            <circle cx="65" cy="70" r="7.5" fill={accentColor} />
            {/* Bright Cyan Specular Highlight */}
            <circle cx="63.5" cy="68.5" r="3" fill="#93C5FD" />
          </g>
        </g>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 2. WORDMARK "DeAnon.Ai" (HIGH-PRECISION GEOMETRIC TYPOGRAPHY)  */}
      {/* ───────────────────────────────────────────────────────────── */}
      {(variant === 'full' || variant === 'text') && (
        <g id="DeAnon-Wordmark" fill={color}>
          {/* 
            Precision Vector Path for "DeAnon.Ai" 
            Guarantees 1:1 pixel-perfect rendering across all systems without font dependencies!
          */}

          {/* 'D' - Capital D */}
          <path d="M 175 32 H 202 C 220 32 232 44 232 64 C 232 84 220 96 202 96 H 175 V 32 Z M 190 46 V 82 H 201 C 211 82 217 74 217 64 C 217 54 211 46 201 46 H 190 Z" />

          {/* 'e' - Lowercase e */}
          <path d="M 256 50 C 244 50 236 59 236 73 C 236 87 244 96 257 96 C 265 96 271 92 274 85 L 263 80 C 262 84 259 86 256 86 C 251 86 248 82 248 76 H 275 C 275 74 275 72 275 70 C 275 58 267 50 256 50 Z M 248 67 C 249 61 252 58 256 58 C 260 58 263 61 264 67 H 248 Z" />

          {/* 'A' - Capital A */}
          <path d="M 296 32 L 278 96 H 293 L 297 81 H 317 L 321 96 H 336 L 318 32 H 296 Z M 307 46 L 314 70 H 300 L 307 46 Z" />

          {/* 'n' - Lowercase n */}
          <path d="M 342 52 V 96 H 356 V 70 C 356 63 360 59 366 59 C 372 59 375 63 375 70 V 96 H 389 V 68 C 389 57 380 50 370 50 C 362 50 357 54 354 60 V 52 H 342 Z" />

          {/* 'o' - Lowercase o */}
          <path d="M 412 50 C 399 50 391 60 391 73 C 391 86 399 96 412 96 C 425 96 433 86 433 73 C 433 60 425 50 412 50 Z M 412 62 C 418 62 421 66 421 73 C 421 80 418 84 412 84 C 406 84 403 80 403 73 C 403 66 406 62 412 62 Z" />

          {/* 'n' - Lowercase n */}
          <path d="M 440 52 V 96 H 454 V 70 C 454 63 458 59 464 59 C 470 59 473 63 473 70 V 96 H 487 V 68 C 487 57 478 50 468 50 C 460 50 455 54 452 60 V 52 H 440 Z" />

          {/* '.' - Dot / Period */}
          <circle cx="498" cy="90" r="6" />

          {/* 'A' - Capital A in .Ai */}
          <path d="M 519 32 L 501 96 H 516 L 520 81 H 540 L 544 96 H 559 L 541 32 H 519 Z M 530 46 L 537 70 H 523 L 530 46 Z" />

          {/* 'i' - Lowercase i in .Ai */}
          <path d="M 565 52 V 96 H 579 V 52 H 565 Z" />
          <circle cx="572" cy="38" r="7" />
        </g>
      )}
    </svg>
  );
};

export default DeAnonLogo;
