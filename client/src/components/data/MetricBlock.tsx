import { CountUp } from '../motion/CountUp';

type MetricBlockProps = {
  label: string;
  value: number;
  trend?: string;
  onClick?: () => void;
};

export function MetricBlock({ label, value, trend, onClick }: MetricBlockProps) {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`text-left py-6 border-t border-border-subtle group ${onClick ? 'cursor-pointer hover:border-accent-border/40 transition-colors' : ''}`}
    >
      <p className="meta-label mb-4">{label}</p>
      <p className="text-4xl md:text-5xl lg:text-6xl font-light tabular-nums text-text-primary tracking-tight">
        <CountUp target={value} />
      </p>
      {trend && <p className="text-xs text-accent-solid mt-3 font-medium tracking-wide uppercase">{trend}</p>}
      <span className="block h-px w-0 group-hover:w-full bg-accent-solid/50 transition-all duration-500 mt-4" />
    </Tag>
  );
}
