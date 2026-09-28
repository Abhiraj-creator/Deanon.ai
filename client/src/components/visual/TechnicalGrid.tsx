export function TechnicalGrid({ className = '', size = 48 }: { className?: string; size?: number }) {
  return (
    <svg className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} aria-hidden>
      <defs>
        <pattern id="techGrid" width={size} height={size} patternUnits="userSpaceOnUse">
          <path
            d={`M ${size} 0 L 0 0 0 ${size}`}
            fill="none"
            stroke="rgba(57,255,104,0.06)"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#techGrid)" />
    </svg>
  );
}
