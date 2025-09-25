import { createContext } from "react";

export interface StorageContextValue {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
}

export const StorageContext = createContext<StorageContextValue | null>(null);
