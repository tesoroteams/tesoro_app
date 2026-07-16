import { useEffect } from "react";
import { useEventModal } from "../../context/EventModalContext";
import {
  CATEGORY_SHORT_LABELS,
  RECURRENCE_LABELS,
  formatTime,
} from "../../lib/format";
import Icon from "../ui/Icon";

export default function EventModal() {
  const { selected, close } = useEventModal();

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected, close]);

  if (!selected) return null;
  const event = selected;
  const date = new Date(`${event.startDate}T00:00:00`);
  const month = date
    .toLocaleDateString(undefined, { month: "short" })
    .toUpperCase();
  const day = date.toLocaleDateString(undefined, { day: "numeric" });
  const weekday = date.toLocaleDateString(undefined, { weekday: "long" });

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <div
        className="absolute inset-0 bg-ink-100/30 backdrop-blur-sm"
        onClick={close}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={event.title}
        className="relative z-10 flex max-h-[88vh] w-full flex-col overflow-hidden rounded-t-[2rem] bg-white shadow-card animate-slide-up sm:max-w-md sm:rounded-[2rem] sm:border sm:border-ink-100/15 sm:animate-fade-in"
      >
        <div className="mx-auto mt-2.5 h-1.5 w-10 shrink-0 rounded-full bg-ink-100/20 sm:hidden" />
        <div className="h-2 w-full shrink-0 bg-beat-500 sm:h-2.5" />

        <div className="relative flex-1 overflow-y-auto px-5 pb-5 pt-6 sm:px-7 sm:pb-7">
          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full p-2 text-ink-400 transition hover:bg-ink-100/5 hover:text-ink-100"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>

          <div className="grid grid-cols-[4.5rem_1fr] gap-4 pr-8">
            <div className="flex h-[5.25rem] flex-col items-center justify-center rounded-2xl bg-ink-100 text-white shadow-[0_10px_30px_-16px_rgba(11,29,85,0.55)]">
              <span className="text-[10px] font-bold tracking-[0.2em] text-beat-300">
                {month}
              </span>
              <span className="font-display text-3xl font-bold leading-none">
                {day}
              </span>
            </div>
            <div className="min-w-0 self-center">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-beat-600">
                {CATEGORY_SHORT_LABELS[event.category]}
              </p>
              <h2 className="font-display text-xl font-bold leading-tight text-ink-100">
                {event.title}
              </h2>
            </div>
          </div>

          <div className="mt-6 border-y border-dashed border-ink-100/15 py-4">
            <p className="font-display text-base font-semibold text-ink-100">
              {event.venue}
            </p>
            <p className="mt-1 text-sm text-ink-400">
              {event.address ? `${event.address}, ` : ""}
              {event.city}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-ink-200">
              <span>{weekday}</span>
              <span className="text-ink-700">•</span>
              <span>{formatTime(event.time)}</span>
              <span className="text-ink-700">•</span>
              <span>{RECURRENCE_LABELS[event.recurrence]}</span>
              <span className="text-ink-700">•</span>
              <span className="text-beat-600">{event.price}</span>
            </div>
          </div>

          {event.description && (
            <p className="mt-5 line-clamp-4 whitespace-pre-line text-sm leading-relaxed text-ink-300">
              {event.description}
            </p>
          )}

          <div className="mt-6 pb-[max(0rem,env(safe-area-inset-bottom))]">
            {event.link ? (
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-beat-500 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_-10px_rgba(59,130,246,0.75)] transition-all hover:bg-beat-600"
            >
              View on Eventbrite
              <Icon name="arrow-right" className="h-4 w-4" />
            </a>
            ) : (
            <button
              onClick={close}
              className="inline-flex w-full items-center justify-center rounded-xl border border-ink-100/20 px-5 py-3.5 text-sm font-semibold text-ink-100 transition hover:bg-ink-100/5"
            >
              Close
            </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
