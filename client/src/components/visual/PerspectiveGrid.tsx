export function PerspectiveGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]" aria-hidden>
      <svg className="w-full h-full" preserveAspectRatio="none">
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={`${(i + 1) * 8}%`}
            x2="100%"
            y2={`${50 + i * 2}%`}
            stroke="#39FF68"
            strokeWidth="0.5"
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={`${(i + 1) * 12}%`}
            y1="60%"
            x2="50%"
            y2="100%"
            stroke="#39FF68"
            strokeWidth="0.5"
          />
        ))}
      </svg>
    </div>
  );
}
