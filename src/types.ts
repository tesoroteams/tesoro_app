export type UserRole = "new" | "trusted" | "moderator" | "admin";

export interface User {
  id: string;
  username: string;
  email: string;
  /** Dummy plaintext password - demo only, never do this for real. */
  password: string;
  reputation: number;
  role: UserRole;
  joinedAt: string;
  avatarColor: string;
  bio?: string;
  badges: string[];
}

export type EventCategory = "drum-circle" | "ecstatic-dance" | "festival";

export type Region =
  | "austin"
  | "dallas"
  | "houston"
  | "san-antonio"
  | "california"
  | "miami"
  | "new-york"
  | "chicago"
  | "denver";

export type EventSource = "organizer" | "community" | "scraped";

export type EventStatus =
  | "verified"
  | "unverified"
  | "pending"
  | "canceled"
  | "expired";

export type RecurrenceRule = "one-time" | "weekly" | "biweekly" | "monthly";

export type VerificationType =
  | "happened"
  | "canceled"
  | "time-changed"
  | "still-recurring";

export interface Verification {
  id: string;
  userId: string;
  type: VerificationType;
  note?: string;
  createdAt: string;
}

export type RevisionStatus = "pending" | "approved" | "rejected";

/** A proposed set of field changes to an event (Wikipedia-style). */
export interface Revision {
  id: string;
  eventId: string;
  userId: string;
  summary: string;
  /** Field -> { from, to } for a readable diff. */
  changes: Record<string, { from: unknown; to: unknown }>;
  status: RevisionStatus;
  createdAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
  /** True when applied instantly by a trusted user (no approval needed). */
  auto: boolean;
}

export interface DrumEvent {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  venue: string;
  address: string;
  city: string;
  region: Region;
  startDate: string; // ISO date (yyyy-mm-dd)
  time: string; // e.g. "19:30"
  recurrence: RecurrenceRule;
  tags: string[];
  price: string; // "Free", "$10", etc.
  imageColor: string;
  /** External link to the source listing (e.g. Eventbrite). */
  link?: string;
  organizerId?: string;
  createdBy?: string;
  source: EventSource;
  status: EventStatus;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  lastConfirmedAt: string;
  verifications: Verification[];
  revisions: Revision[];
}

/** A mock item produced by the simulated scraper, awaiting import. */
export interface ScrapedItem {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  venue: string;
  address: string;
  city: string;
  region: Region;
  startDate: string;
  time: string;
  recurrence: RecurrenceRule;
  price: string;
  sourceName: string; // e.g. "Eventbrite", "City Calendar"
  sourceUrl: string;
  scrapedAt: string;
  confidence: number; // 0-1 mock match confidence
  status: "new" | "imported" | "dismissed";
}

export interface AppData {
  users: User[];
  events: DrumEvent[];
  scraped: ScrapedItem[];
  version: number;
}
