import type { ReactNode } from "react";
import Icon, { type IconName } from "./Icon";

export default function EmptyState({
  icon = "search",
  title,
  message,
  action,
}: {
  icon?: IconName;
  title: string;
  message?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-100/20 bg-ink-100/[0.02] px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-ink-100/5 text-ink-300">
        <Icon name={icon} className="h-6 w-6" />
      </div>
      <h3 className="font-display text-lg font-semibold text-ink-100">{title}</h3>
      {message && <p className="mt-1 max-w-sm text-sm text-ink-400">{message}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
