import type { ReactNode } from "react";
import { useEffect } from "react";
import Icon from "./Icon";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function Modal({ open, onClose, title, children, footer }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink-100/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-lg animate-fade-in card p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="font-display text-lg font-semibold text-ink-100">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-ink-400 transition hover:bg-ink-100/5 hover:text-ink-100"
            aria-label="Close"
          >
            <Icon name="close" />
          </button>
        </div>
        <div className="text-sm text-ink-200">{children}</div>
        {footer && <div className="mt-6 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}
