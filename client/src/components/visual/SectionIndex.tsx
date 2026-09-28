export function SectionIndex({ index, label }: { index: string; label: string }) {
  return (
    <p className="section-index mb-3">
      <span className="text-text-muted">{index}</span>
      <span className="text-text-muted mx-2">/</span>
      <span className="text-text-secondary">{label}</span>
    </p>
  );
}
