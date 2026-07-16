import type { ReactNode } from "react";

export default function Tag({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border border-ink-100/20 bg-ink-100/5 px-2.5 py-0.5 text-xs font-medium text-ink-200 ${className}`}
    >
      {children}
    </span>
  );
}
