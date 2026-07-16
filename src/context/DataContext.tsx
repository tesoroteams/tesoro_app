import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { AppData, DrumEvent } from "../types";
import { loadData, resetData, saveData } from "../lib/storage";

interface DataContextValue {
  data: AppData;
  getEvent: (id: string) => DrumEvent | undefined;
  resetDemo: () => void;
}

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(() => loadData());

  useEffect(() => {
    saveData(data);
  }, [data]);

  const getEvent = useCallback(
    (id: string) => data.events.find((e) => e.id === id),
    [data.events]
  );

  const resetDemo = useCallback(() => {
    setData(resetData());
  }, []);

  const value = useMemo<DataContextValue>(
    () => ({ data, getEvent, resetDemo }),
    [data, getEvent, resetDemo]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData(): DataContextValue {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
