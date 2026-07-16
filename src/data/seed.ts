import type { AppData, DrumEvent, EventCategory, RecurrenceRule } from "../types";

export const DATA_VERSION = 3;

const DAY = 24 * 60 * 60 * 1000;

function iso(offsetDays: number): string {
  return new Date(Date.now() + offsetDays * DAY).toISOString();
}

function dateOnly(offsetDays: number): string {
  return new Date(Date.now() + offsetDays * DAY).toISOString().slice(0, 10);
}

const EVENT_COLORS = [
  "#3b82f6",
  "#4f8cff",
  "#25c199",
  "#7c5cff",
  "#2dd4bf",
  "#f2c14e",
  "#d84fd8",
  "#ff6b6b",
];

/** Curated from the Eventbrite "Drum Events (Austin)" collection. */
const EVENTBRITE_COLLECTION =
  "https://www.eventbrite.com/cc/drum-events-austin-756199";

interface EventSeed {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  venue: string;
  address: string;
  dayOffset: number;
  time: string;
  recurrence: RecurrenceRule;
  tags: string[];
}

const EVENT_SEEDS: EventSeed[] = [
  {
    id: "e-1",
    title: "Weekly Drum Circle (Barton Springs)",
    description:
      "A welcoming weekly drum circle on the lawn near Barton Springs. Bring a drum or just come to dance - all levels and ages welcome.",
    category: "drum-circle",
    venue: "Barton Springs",
    address: "2201 William Barton Dr",
    dayOffset: 3,
    time: "16:30",
    recurrence: "weekly",
    tags: ["beginner-friendly", "outdoor", "free"],
  },
  {
    id: "e-2",
    title: "Full Moon Drum Circle - Texas Music River Ranch",
    description:
      "Monthly full moon gathering out at the ranch. Drummers, dancers, and fire spinners circle up as the moon rises. Bring a chair and layers.",
    category: "drum-circle",
    venue: "Texas Music River Ranch",
    address: "Off Highway 71, Austin",
    dayOffset: 14,
    time: "20:00",
    recurrence: "monthly",
    tags: ["full-moon", "outdoor", "all-levels"],
  },
  {
    id: "e-3",
    title: "West African Dance Class (with Jean-Claude Lessou)",
    description:
      "Traditional West African dance led by Jean-Claude Lessou with live drumming at Ballet Austin. Pay at the door - beginners welcome.",
    category: "ecstatic-dance",
    venue: "Ballet Austin",
    address: "501 W 3rd St",
    dayOffset: 5,
    time: "19:30",
    recurrence: "weekly",
    tags: ["west-african", "live-drums", "class"],
  },
  {
    id: "e-4",
    title: "West African Dance Class (with Mami Camara)",
    description:
      "Energetic West African dance class with Mami Camara and live drummers. Pay at the studio. No experience needed, just bring water.",
    category: "ecstatic-dance",
    venue: "The Dance Studio",
    address: "Austin, TX",
    dayOffset: 6,
    time: "19:00",
    recurrence: "weekly",
    tags: ["west-african", "live-drums", "all-levels"],
  },
  {
    id: "e-5",
    title: "4th of July Potluck & Drum Circle",
    description:
      "Celebrate with a community potluck followed by an open drum circle. Bring a dish to share and your favorite percussion.",
    category: "drum-circle",
    venue: "Community Park",
    address: "Austin, TX",
    dayOffset: 20,
    time: "17:00",
    recurrence: "one-time",
    tags: ["potluck", "outdoor", "community"],
  },
  {
    id: "e-6",
    title: "Drum Circle at Eeyore's Birthday Party",
    description:
      "The legendary Austin tradition returns - a day-long festival in the park with a massive open drum circle, costumes, and live music.",
    category: "festival",
    venue: "Pease District Park",
    address: "1100 Kingsbury St",
    dayOffset: 25,
    time: "11:00",
    recurrence: "one-time",
    tags: ["festival", "iconic", "family-friendly"],
  },
  {
    id: "e-7",
    title: "Medicine for the People Festival - Join Our Drum Circle",
    description:
      "A day of community, sound, and healing. Join the drum circle at the Medicine for the People Festival with drummers from across Texas.",
    category: "festival",
    venue: "Austin Festival Grounds",
    address: "Austin, TX",
    dayOffset: 30,
    time: "11:00",
    recurrence: "one-time",
    tags: ["festival", "sound-healing", "community"],
  },
];

function buildEvents(): DrumEvent[] {
  return EVENT_SEEDS.map((s, i) => ({
    id: s.id,
    title: s.title,
    description: s.description,
    category: s.category,
    venue: s.venue,
    address: s.address,
    city: "Austin",
    region: "austin",
    startDate: dateOnly(s.dayOffset),
    time: s.time,
    recurrence: s.recurrence,
    tags: s.tags,
    price: "Free",
    imageColor: EVENT_COLORS[i % EVENT_COLORS.length],
    link: EVENTBRITE_COLLECTION,
    source: "scraped",
    status: "verified",
    createdAt: iso(-14 + i),
    updatedAt: iso(-2 + i),
    expiresAt: iso(s.dayOffset + 30),
    lastConfirmedAt: iso(-2),
    verifications: [],
    revisions: [],
  }));
}

export function buildSeedData(): AppData {
  return {
    users: [],
    events: buildEvents(),
    scraped: [],
    version: DATA_VERSION,
  };
}
