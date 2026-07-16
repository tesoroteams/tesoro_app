import type {
  EventCategory,
  EventStatus,
  RecurrenceRule,
  Region,
  VerificationType,
} from "../types";

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatShortDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

export function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.round(months / 12)}y ago`;
}

export const CATEGORY_LABELS: Record<EventCategory, string> = {
  "drum-circle": "Drum Circles / West African Drumming",
  "ecstatic-dance": "Ecstatic Dance",
  festival: "Festivals",
};

/** Compact labels for chips and badges. */
export const CATEGORY_SHORT_LABELS: Record<EventCategory, string> = {
  "drum-circle": "Drum Circle",
  "ecstatic-dance": "Ecstatic Dance",
  festival: "Festival",
};

export const REGION_LABELS: Record<Region, string> = {
  austin: "Austin",
  dallas: "Dallas",
  houston: "Houston",
  "san-antonio": "San Antonio",
  california: "California",
  miami: "Miami",
  "new-york": "New York",
  chicago: "Chicago",
  denver: "Denver",
};

export const RECURRENCE_LABELS: Record<RecurrenceRule, string> = {
  "one-time": "One-time",
  weekly: "Weekly",
  biweekly: "Biweekly",
  monthly: "Monthly",
};

export const STATUS_LABELS: Record<EventStatus, string> = {
  verified: "Verified",
  unverified: "Unverified",
  pending: "Pending review",
  canceled: "Canceled",
  expired: "Expired",
};

export const VERIFICATION_LABELS: Record<VerificationType, string> = {
  happened: "It happened",
  canceled: "Canceled",
  "time-changed": "Time changed",
  "still-recurring": "Still recurring",
};

export const CATEGORIES: EventCategory[] = [
  "drum-circle",
  "ecstatic-dance",
  "festival",
];

export const REGIONS: Region[] = [
  "austin",
  "dallas",
  "houston",
  "san-antonio",
  "california",
  "miami",
  "new-york",
  "chicago",
  "denver",
];

export const RECURRENCE_RULES: RecurrenceRule[] = [
  "one-time",
  "weekly",
  "biweekly",
  "monthly",
];
