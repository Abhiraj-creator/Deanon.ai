export const ConfidencePill = ({
  level,
}: {
  level: 'High' | 'Medium' | 'Low' | 'Clearnet';
}) => {
  const styles = {
    High: 'bg-status-red-bg text-status-red',
    Medium: 'bg-status-orange-bg text-status-orange',
    Low: 'bg-status-gray text-white', // Adjusted for visibility
    Clearnet: 'bg-status-green-bg text-status-teal',
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${styles[level]}`}
    >
      {level === 'Clearnet' ? 'Potential Clearnet Correlation' : `${level} Confidence`}
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
