import React, { createContext } from "react";

export interface StorageContextValue {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
}

export const StorageContext = createContext<StorageContextValue | null>(null);

export function StorageProvider({ children }: { children: React.ReactNode }) {
  const storage: StorageContextValue = {
    getItem: (key: string) => localStorage.getItem(key),
    setItem: (key: string, value: string) => localStorage.setItem(key, value),
  };

  return <StorageContext value={storage}>{children}</StorageContext>;
}
