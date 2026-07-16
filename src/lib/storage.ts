import type { AppData } from "../types";
import { buildSeedData, DATA_VERSION } from "../data/seed";

const DATA_KEY = "polyrhythm.data";

function isValidAppData(v: unknown): v is AppData {
  if (!v || typeof v !== "object") return false;
  const d = v as Record<string, unknown>;
  return (
    d.version === DATA_VERSION &&
    Array.isArray(d.users) &&
    Array.isArray(d.events) &&
    Array.isArray(d.scraped)
  );
}

export function loadData(): AppData {
  try {
    const raw = localStorage.getItem(DATA_KEY);
    if (!raw) {
      const seed = buildSeedData();
      saveData(seed);
      return seed;
    }
    const parsed: unknown = JSON.parse(raw);
    if (!isValidAppData(parsed)) {
      const seed = buildSeedData();
      saveData(seed);
      return seed;
    }
    return parsed;
  } catch {
    const seed = buildSeedData();
    saveData(seed);
    return seed;
  }
}

export function saveData(data: AppData): void {
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
}

export function resetData(): AppData {
  const seed = buildSeedData();
  saveData(seed);
  return seed;
}

export function uid(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}${Date.now()
    .toString(36)
    .slice(-3)}`;
}
