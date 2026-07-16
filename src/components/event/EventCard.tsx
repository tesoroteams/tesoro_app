import type { DrumEvent } from "../../types";
import {
  CATEGORY_SHORT_LABELS,
  RECURRENCE_LABELS,
  REGION_LABELS,
  formatShortDate,
  formatTime,
} from "../../lib/format";
import { useEventModal } from "../../context/EventModalContext";
import StatusBadge from "./StatusBadge";
import SourceBadge from "./SourceBadge";
import Icon from "../ui/Icon";

export default function EventCard({ event }: { event: DrumEvent }) {
  const { openEvent } = useEventModal();
  return (
    <button
      type="button"
      onClick={() => openEvent(event)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink-100/15 bg-white text-left shadow-card transition hover:-translate-y-0.5 hover:border-beat-500/30 hover:shadow-[0_12px_40px_-12px_rgba(59,130,246,0.2)]"
    >
      <div
        className="relative h-28 w-full"
        style={{
          background: `linear-gradient(135deg, ${event.imageColor}dd, ${event.imageColor}55)`,
        }}
      >
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1.5px)] [background-size:16px_16px]" />
        <div className="absolute left-3 top-3 flex flex-col items-center rounded-xl bg-ink-50/85 px-2.5 py-1.5 text-center backdrop-blur">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-beat-300">
            {formatShortDate(event.startDate).split(" ")[0]}
          </span>
          <span className="text-lg font-bold leading-none text-ink-100">
            {formatShortDate(event.startDate).split(" ")[1]}
          </span>
        </div>
        <div className="absolute right-3 top-3">
          <SourceBadge source={event.source} />
        </div>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-ink-50/80 px-2.5 py-0.5 text-xs font-medium text-ink-100 backdrop-blur">
          <Icon name="drum" className="h-3.5 w-3.5" />
          {CATEGORY_SHORT_LABELS[event.category]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-display text-base font-semibold leading-snug text-ink-100 transition group-hover:text-beat-600">
            {event.title}
          </h3>
        </div>
        <div className="mb-3 space-y-1 text-sm text-ink-300">
          <p className="flex items-center gap-1.5">
            <Icon name="clock" className="h-3.5 w-3.5 text-ink-400" />
            {formatTime(event.time)} - {RECURRENCE_LABELS[event.recurrence]}
          </p>
          <p className="flex items-center gap-1.5">
            <Icon name="pin" className="h-3.5 w-3.5 text-ink-400" />
            <span className="truncate">
              {event.venue}, {event.city} · {REGION_LABELS[event.region]}
            </span>
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <StatusBadge status={event.status} />
          <span className="text-sm font-semibold text-ink-100">{event.price}</span>
        </div>
      </div>
    </button>
  );
}
