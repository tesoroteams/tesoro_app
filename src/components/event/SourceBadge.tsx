import type { EventSource } from "../../types";
import Icon, { type IconName } from "../ui/Icon";

const CONFIG: Record<EventSource, { label: string; icon: IconName; className: string }> = {
  organizer: {
    label: "Organizer",
    icon: "shield",
    className: "border-beat-500/40 bg-beat-500/10 text-beat-200",
  },
  community: {
    label: "Community",
    icon: "users",
    className: "border-violet-500/40 bg-violet-500/10 text-violet-200",
  },
  scraped: {
    label: "Imported",
    icon: "robot",
    className: "border-cyan-500/40 bg-cyan-500/10 text-cyan-200",
  },
};

export default function SourceBadge({
  source,
  className = "",
}: {
  source: EventSource;
  className?: string;
}) {
  const c = CONFIG[source];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${c.className} ${className}`}
    >
      <Icon name={c.icon} className="h-3.5 w-3.5" />
      {c.label}
    </span>
  );
}
