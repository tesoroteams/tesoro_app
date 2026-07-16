import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { DrumEvent } from "../types";

interface EventModalContextValue {
  selected: DrumEvent | null;
  openEvent: (event: DrumEvent) => void;
  close: () => void;
}

const EventModalContext = createContext<EventModalContextValue | null>(null);

export function EventModalProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<DrumEvent | null>(null);
  const openEvent = useCallback((event: DrumEvent) => setSelected(event), []);
  const close = useCallback(() => setSelected(null), []);
  const value = useMemo(
    () => ({ selected, openEvent, close }),
    [selected, openEvent, close]
  );

  return (
    <EventModalContext.Provider value={value}>
      {children}
    </EventModalContext.Provider>
  );
}

export function useEventModal(): EventModalContextValue {
  const ctx = useContext(EventModalContext);
  if (!ctx) throw new Error("useEventModal must be used within EventModalProvider");
  return ctx;
}
