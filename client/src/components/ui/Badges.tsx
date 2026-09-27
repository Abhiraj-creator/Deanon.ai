export const ConfidencePill = ({
  level,
}: {
  level: 'High' | 'Moderate' | 'Medium' | 'Low' | 'Strong' | 'Clearnet';
}) => {
  const styles = {
    High: 'bg-status-red-bg text-status-red',
    Moderate: 'bg-status-orange-bg text-status-orange',
    Medium: 'bg-status-orange-bg text-status-orange',
    Strong: 'bg-status-green-bg text-status-green',
    Low: 'bg-status-gray text-white',
    Clearnet: 'bg-status-green-bg text-status-teal',
  };

  const label = level === 'Clearnet'
    ? 'Potential Clearnet Correlation'
    : level === 'Strong'
      ? 'Strong Confidence'
      : level === 'Moderate'
        ? 'Moderate Confidence'
        : level === 'Medium'
          ? 'Medium Confidence'
          : `${level} Confidence`;

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${styles[level]}`}
    >
      {label}
    </span>
  );
};

export const StatusDot = ({ status }: { status: 'Online' | 'Offline' }) => (
  <div className="flex items-center space-x-2">
    <span className="relative flex h-2.5 w-2.5">
      {status === 'Online' && (
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-green opacity-75"></span>
      )}
      <span
        className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
          status === 'Online' ? 'bg-status-green' : 'bg-status-gray'
        }`}
      ></span>
    </span>
    <span className={status === 'Online' ? 'text-status-green text-sm' : 'text-text-muted text-sm'}>
      {status}
    </span>
  </div>
);
