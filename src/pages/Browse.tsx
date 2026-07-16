import { useMemo, useState } from "react";
import { useData } from "../context/DataContext";
import EventCard from "../components/event/EventCard";
import { Input } from "../components/ui/Input";
import Select from "../components/ui/Select";
import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button";
import {
  CATEGORIES,
  CATEGORY_SHORT_LABELS,
  REGIONS,
  REGION_LABELS,
  STATUS_LABELS,
} from "../lib/format";
import type { EventStatus } from "../types";

const STATUS_OPTIONS: EventStatus[] = [
  "verified",
  "unverified",
  "pending",
  "canceled",
  "expired",
];

export default function Browse() {
  const { data } = useData();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const [region, setRegion] = useState("all");
  const [city, setCity] = useState("all");
  const [status, setStatus] = useState("active");
  const [source, setSource] = useState("all");
  const [sort, setSort] = useState("date");

  const cities = useMemo(
    () => Array.from(new Set(data.events.map((e) => e.city))).sort(),
    [data.events]
  );

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    let list = data.events.filter((e) => {
      if (term) {
        const hay = `${e.title} ${e.venue} ${e.city} ${e.tags.join(" ")}`.toLowerCase();
        if (!hay.includes(term)) return false;
      }
      if (category !== "all" && e.category !== category) return false;
      if (region !== "all" && e.region !== region) return false;
      if (city !== "all" && e.city !== city) return false;
      if (source !== "all" && e.source !== source) return false;
      if (status === "active") {
        if (e.status === "canceled" || e.status === "expired") return false;
      } else if (status !== "all" && e.status !== status) {
        return false;
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sort === "date") return a.startDate.localeCompare(b.startDate);
      if (sort === "recent") return b.createdAt.localeCompare(a.createdAt);
      if (sort === "title") return a.title.localeCompare(b.title);
      return 0;
    });
    return list;
  }, [data.events, q, category, region, city, status, source, sort]);

  function reset() {
    setQ("");
    setCategory("all");
    setRegion("all");
    setCity("all");
    setStatus("active");
    setSource("all");
    setSort("date");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink-100">
            Browse events
          </h1>
          <p className="mt-1 text-sm text-ink-400">
            {filtered.length} event{filtered.length === 1 ? "" : "s"} found
          </p>
        </div>
      </div>

      <div className="card mb-8 p-4">
        <div className="mb-4">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by title, venue, city, or tag..."
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <Select
            label="Type"
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
            label="Region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            options={[
              { value: "all", label: "All regions" },
              ...REGIONS.map((r) => ({ value: r, label: REGION_LABELS[r] })),
            ]}
          />
          <Select
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            options={[
              { value: "all", label: "All cities" },
              ...cities.map((c) => ({ value: c, label: c })),
            ]}
          />
          <Select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={[
              { value: "active", label: "Active only" },
              { value: "all", label: "All statuses" },
              ...STATUS_OPTIONS.map((s) => ({ value: s, label: STATUS_LABELS[s] })),
            ]}
          />
          <Select
            label="Source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            options={[
              { value: "all", label: "All sources" },
              { value: "organizer", label: "Organizer" },
              { value: "community", label: "Community" },
              { value: "scraped", label: "Imported" },
            ]}
          />
          <Select
            label="Sort by"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            options={[
              { value: "date", label: "Soonest date" },
              { value: "recent", label: "Recently added" },
              { value: "title", label: "Title (A-Z)" },
            ]}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No events match"
          message="Try loosening your filters or search for something else."
          action={
            <Button variant="secondary" icon="refresh" onClick={reset}>
              Reset filters
            </Button>
          }
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      )}
    </div>
  );
}
