import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import Icon, { type IconName } from "../components/ui/Icon";

export type ToastKind = "success" | "info" | "error";

interface Toast {
  id: number;
  kind: ToastKind;
  message: string;
}

interface ToastContextValue {
  toast: (message: string, kind?: ToastKind) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let counter = 0;

const KIND_STYLES: Record<ToastKind, string> = {
  success: "border-beat-500/40 bg-beat-500/10 text-beat-100",
  info: "border-beat-500/40 bg-beat-500/10 text-beat-100",
  error: "border-rose-500/40 bg-rose-500/10 text-rose-100",
};

const KIND_ICON: Record<ToastKind, IconName> = {
  success: "check-circle",
  info: "info",
  error: "error",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, kind: ToastKind = "success") => {
    const id = ++counter;
    setToasts((prev) => [...prev, { id, kind, message }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4200);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex w-full max-w-sm animate-fade-in items-start gap-3 rounded-xl border px-4 py-3 text-sm shadow-card backdrop-blur ${KIND_STYLES[t.kind]}`}
          >
            <Icon name={KIND_ICON[t.kind]} className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="flex-1">{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
