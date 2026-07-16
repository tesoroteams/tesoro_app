import type { EventStatus } from "../../types";
import { STATUS_LABELS } from "../../lib/format";
import Icon, { type IconName } from "../ui/Icon";

const STYLES: Record<EventStatus, string> = {
  verified: "border-beat-500/40 bg-beat-500/10 text-beat-300",
  unverified: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  pending: "border-sky-500/40 bg-sky-500/10 text-sky-300",
  canceled: "border-rose-500/40 bg-rose-500/10 text-rose-300",
  expired: "border-ink-500/40 bg-ink-500/10 text-ink-300",
};

const ICONS: Record<EventStatus, IconName> = {
  verified: "check-circle",
  unverified: "info",
  pending: "clock",
  canceled: "ban",
  expired: "history",
};

export default function StatusBadge({
  status,
  className = "",
}: {
  status: EventStatus;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${STYLES[status]} ${className}`}
    >
      <Icon name={ICONS[status]} className="h-3.5 w-3.5" />
      {STATUS_LABELS[status]}
    </span>
  );
}
