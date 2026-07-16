import { useMemo, useState } from "react";
import { useData } from "../context/DataContext";
import { useContactModal } from "../context/ContactModalContext";
import { useEventModal } from "../context/EventModalContext";
import Icon, { type IconName } from "../components/ui/Icon";
import { Input } from "../components/ui/Input";
import Select from "../components/ui/Select";
import {
  CATEGORIES,
  CATEGORY_SHORT_LABELS,
  RECURRENCE_LABELS,
  REGIONS,
  REGION_LABELS,
  formatShortDate,
  formatTime,
} from "../lib/format";
import type { DrumEvent, EventCategory } from "../types";

const CATEGORY_ICON: Record<EventCategory, IconName> = {
  "drum-circle": "drum",
  "ecstatic-dance": "flame",
  festival: "tent",
};

const HERO_STEPS: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "search",
    title: "We find the events",
    body: "Right now we're focused on drum circles, tea gatherings, ecstatic dance, and festivals.",
  },
  {
    icon: "telegram",
    title: "You get one weekly text",
    body: "A short Telegram update with what's on near you.",
  },
  {
    icon: "plus",
    title: "Community keeps it fresh",
    body: "Anyone can add events to keep listings accurate.",
  },
];

export default function Home() {
  const { data } = useData();
  const { open: openContactModal } = useContactModal();

  const activeEvents = useMemo(
    () =>
      data.events
        .filter((e) => e.status !== "canceled" && e.status !== "expired")
        .sort((a, b) => a.startDate.localeCompare(b.startDate)),
    [data.events]
  );

  return (
    <>
      {/* Hero */}
      <section className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-6xl flex-col justify-center px-4 py-16">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-sm font-medium text-beat-300">
            <Icon name="sparkles" className="h-4 w-4" />
            Tesoro
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink-100 sm:text-6xl sm:leading-[1.05]">
            Discover local gatherings.
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={openContactModal}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-beat-500 px-6 py-3.5 text-base font-medium text-white shadow-[0_6px_20px_-6px_rgba(59,130,246,0.5)] transition-all hover:bg-beat-600"
            >
              Sign up
            </button>
            <a
              href="#directory"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink-100/20 bg-ink-100/5 px-6 py-3.5 text-base font-medium text-ink-100 transition-all hover:bg-ink-100/10"
            >
              <Icon name="search" className="h-5 w-5" />
              Browse events
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col divide-y divide-white/5 rounded-2xl border border-ink-100/15 bg-ink-100/[0.03] sm:flex-row sm:divide-x sm:divide-y-0">
          {HERO_STEPS.map((step) => (
            <div key={step.title} className="flex flex-1 items-start gap-3.5 p-5 sm:p-6">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-beat-500/10 text-beat-300">
                <Icon name={step.icon} className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink-100">{step.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-400">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
        <a
          href="#directory"
          className="mt-6 inline-flex w-fit self-center items-center gap-1.5 text-xs text-ink-400 transition-colors hover:text-ink-200"
        >
          <span>Scroll to explore the listings</span>
          <Icon name="chevron-down" className="h-3.5 w-3.5" />
        </a>
      </section>

      <EventDirectory events={activeEvents} />
    </>
  );
}

function EventDirectory({ events }: { events: DrumEvent[] }) {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("all");
  const [category, setCategory] = useState("all");
  const [city, setCity] = useState("all");

  const cities = useMemo(() => {
    const pool = region === "all" ? events : events.filter((e) => e.region === region);
    return Array.from(new Set(pool.map((e) => e.city))).sort();
  }, [events, region]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return events.filter((e) => {
      if (term) {
        const hay = `${e.title} ${e.venue} ${e.city} ${e.tags.join(" ")}`.toLowerCase();
        if (!hay.includes(term)) return false;
      }
      if (category !== "all" && e.category !== category) return false;
      if (region !== "all" && e.region !== region) return false;
      if (city !== "all" && e.city !== city) return false;
      return true;
    });
  }, [events, q, category, region, city]);

  return (
    <section
      id="directory"
      className="mx-auto max-w-6xl scroll-mt-8 border-t border-ink-100/15 px-4 pt-0 pb-6 sm:pt-0 sm:pb-10"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl font-bold text-ink-100 sm:text-4xl">
            Upcoming events
          </h2>
          <p className="mt-2 max-w-xl text-base text-ink-400">
            Browse the full list and filter by region, type, or location.
          </p>
        </div>
        <p className="text-sm font-medium text-ink-400">
          {filtered.length} of {events.length} events
        </p>
      </div>

      <div className="card mt-8 p-4 sm:p-5">
        <div className="grid gap-3 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, venue, or city..."
            aria-label="Search events"
          />
          <Select
            aria-label="Filter by region"
            value={region}
            onChange={(e) => {
              setRegion(e.target.value);
              setCity("all");
            }}
            options={[
              { value: "all", label: "All regions" },
              ...REGIONS.map((r) => ({ value: r, label: REGION_LABELS[r] })),
            ]}
          />
          <Select
            aria-label="Filter by type"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={[
              { value: "all", label: "All types" },
              ...CATEGORIES.map((c) => ({
                value: c,
                label: CATEGORY_SHORT_LABELS[c],
              })),
            ]}
          />
          <Select
            aria-label="Filter by location"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            options={[
              { value: "all", label: "All locations" },
              ...cities.map((c) => ({ value: c, label: c })),
            ]}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card mt-6 p-12 text-center">
          <p className="font-display text-lg font-semibold text-ink-100">
            No events match
          </p>
          <p className="mt-1 text-sm text-ink-400">
            Try a different region, type, or search term.
          </p>
        </div>
      ) : (
        <div className="mt-6 divide-y divide-white/5 rounded-2xl border border-ink-100/15 bg-ink-100/[0.02]">
          {filtered.map((event) => (
            <EventRow key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}

function EventRow({ event }: { event: DrumEvent }) {
  const { openEvent } = useEventModal();
  return (
    <button
      type="button"
      onClick={() => openEvent(event)}
      className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-ink-100/[0.03] first:rounded-t-2xl last:rounded-b-2xl"
    >
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ink-100/20 bg-ink-100/5 px-2.5 py-0.5 text-xs font-medium text-ink-200">
        <Icon
          name={CATEGORY_ICON[event.category]}
          className="h-3.5 w-3.5 text-beat-300"
        />
        {CATEGORY_SHORT_LABELS[event.category]}
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-sm font-semibold text-ink-100">
          {event.title}
        </p>
        <p className="truncate text-xs text-ink-400">
          {event.venue}, {event.city}
        </p>
      </div>

      <span className="shrink-0 text-sm font-semibold text-beat-300">
        {formatShortDate(event.startDate)}
      </span>

      <span className="hidden shrink-0 text-sm text-ink-300 sm:block">
        {formatTime(event.time)}
      </span>

      <span className="hidden shrink-0 text-xs text-ink-500 md:block">
        {RECURRENCE_LABELS[event.recurrence]}
      </span>

      <span className="shrink-0 text-sm font-medium text-ink-100">
        {event.price}
      </span>

      <Icon name="arrow-right" className="h-4 w-4 shrink-0 text-ink-600" />
    </button>
  );
}
