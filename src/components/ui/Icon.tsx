interface IconProps {
  name: IconName;
  className?: string;
}

export type IconName =
  | "check"
  | "check-circle"
  | "info"
  | "error"
  | "calendar"
  | "clock"
  | "pin"
  | "users"
  | "plus"
  | "edit"
  | "shield"
  | "bolt"
  | "search"
  | "chevron-down"
  | "chevron-right"
  | "star"
  | "flag"
  | "refresh"
  | "close"
  | "menu"
  | "logout"
  | "trophy"
  | "robot"
  | "drum"
  | "beaver"
  | "treasure"
  | "telegram"
  | "sparkles"
  | "history"
  | "ban"
  | "arrow-right"
  | "tag"
  | "dollar"
  | "flame"
  | "tent"
  | "music"
  | "globe";

const PATHS: Record<IconName, string> = {
  check: "M20 6 9 17l-5-5",
  "check-circle": "M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4 12 14.01l-3-3",
  info: "M12 16v-4 M12 8h.01 M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z",
  error: "M12 8v4 M12 16h.01 M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z",
  calendar:
    "M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  clock: "M12 6v6l4 2 M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z",
  pin: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  users:
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  plus: "M12 5v14 M5 12h14",
  edit: "M12 20h9 M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  bolt: "M13 2 3 14h9l-1 8 10-12h-9z",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.35-4.35",
  "chevron-down": "M6 9l6 6 6-6",
  "chevron-right": "M9 18l6-6-6-6",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z",
  flag: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z M4 22v-7",
  refresh:
    "M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0 1 14.85-3.36L23 10 M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
  close: "M18 6 6 18 M6 6l12 12",
  menu: "M3 12h18 M3 6h18 M3 18h18",
  logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9",
  trophy:
    "M6 9H4.5a2.5 2.5 0 0 1 0-5H6 M18 9h1.5a2.5 2.5 0 0 0 0-5H18 M4 22h16 M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22 M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22 M18 2H6v7a6 6 0 0 0 12 0V2z",
  robot:
    "M12 8V4H8 M4 8h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z M2 14h2 M20 14h2 M9 13v2 M15 13v2",
  drum: "M12 2v6 M9 4l6 4 M2 12c0-2.2 4.5-4 10-4s10 1.8 10 4-4.5 4-10 4-10-1.8-10-4z M2 12v5c0 2.2 4.5 4 10 4s10-1.8 10-4v-5",
  beaver:
    "M7 9.5 4.5 7 3 9.5 4.5 12 M17 9.5 19.5 7 21 9.5 19.5 12 M7 10.5a5 5 0 0 1 10 0v3.5a5 5 0 0 1-10 0z M10 14h4 M9.5 19l-3 3 M14.5 19l3 3 M9 12h.01 M15 12h.01 M10 17l2 2 2-2",
  treasure:
    "M2 8h20v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8z M2 8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2 M12 8v4 M9 11h6 M6 2l2 4 M18 2l-2 4 M12 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
  telegram: "M21.5 3.5 2.8 10.7l6.8 2.6 2.6 6.8L21.5 3.5z M9.6 13.3 21.5 3.5 M12.2 20.1l3.7-4.5",
  sparkles:
    "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z M19 3v4 M21 5h-4",
  history:
    "M3 3v5h5 M3.05 13A9 9 0 1 0 6 5.3L3 8 M12 7v5l4 2",
  ban: "M4.93 4.93l14.14 14.14 M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z",
  "arrow-right": "M5 12h14 M12 5l7 7-7 7",
  tag: "M20.59 13.41 13.42 20.6a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z M7 7h.01",
  dollar: "M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  flame:
    "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
  tent: "M3.5 21 14 3 M20.5 21 10 3 M15.5 21 12 15l-3.5 6 M2 21h20",
  music:
    "M9 18V5l12-2v13 M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M18 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  globe:
    "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
};

export default function Icon({ name, className = "h-4 w-4" }: IconProps) {
  const d = PATHS[name];
  if (!d) return null;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {d.split(" M").map((seg, i) => (
        <path key={i} d={(i === 0 ? seg : "M" + seg).trim()} />
      ))}
    </svg>
  );
}
