import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function Drawer({ open, onClose, title, children, footer }: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" className="absolute inset-0 bg-black/70" onClick={onClose} aria-label="Close drawer" />
      <div className="relative w-full max-w-lg h-full bg-panel border-l border-border-subtle flex flex-col animate-fade-in shadow-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle">
          <h2 className="text-sm font-semibold text-text-primary tracking-wide uppercase">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-primary transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
        {footer && <div className="px-6 py-4 border-t border-border-subtle">{footer}</div>}
      </div>
    </div>
  );
}
