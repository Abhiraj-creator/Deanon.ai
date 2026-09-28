export const ConfidencePill = ({
  level,
}: {
  level: 'High' | 'Moderate' | 'Medium' | 'Low' | 'Strong' | 'Clearnet';
}) => {
  const styles = {
    High: 'border border-status-red/30 text-status-red bg-status-red-bg',
    Moderate: 'border border-status-orange/30 text-status-orange bg-status-orange-bg',
    Medium: 'border border-status-orange/30 text-status-orange bg-status-orange-bg',
    Strong: 'border border-accent-border text-accent-solid bg-accent-soft',
    Low: 'border border-border-subtle text-text-muted bg-card',
    Clearnet: 'border border-status-teal/30 text-status-teal bg-status-green-bg',
  };

  const label =
    level === 'Clearnet'
      ? 'Potential Clearnet Correlation'
      : level === 'Strong'
        ? 'Strong Confidence'
        : level === 'Moderate'
          ? 'Moderate Confidence'
          : level === 'Medium'
            ? 'Medium Confidence'
            : `${level} Confidence`;

  return (
    <span className={`px-2.5 py-0.5 rounded-sm text-[10px] font-medium tracking-wide uppercase ${styles[level]}`}>
      {label}
    </span>
  );
};

export const StatusDot = ({ status }: { status: 'Online' | 'Offline' }) => (
  <div className="flex items-center space-x-2">
    <span className="relative flex h-2 w-2">
      {status === 'Online' && (
        <span className="animate-pulse-subtle absolute inline-flex h-full w-full rounded-full bg-accent-solid opacity-40" />
      )}
      <span
        className={`relative inline-flex rounded-full h-2 w-2 ${
          status === 'Online' ? 'bg-accent-solid' : 'bg-status-gray'
        }`}
      />
    </span>
    <span className={status === 'Online' ? 'text-accent-solid text-sm' : 'text-text-muted text-sm'}>
      {status}
    </span>
  </div>
);
