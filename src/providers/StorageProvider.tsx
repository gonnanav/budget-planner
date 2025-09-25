import { StorageContext, StorageContextValue } from "@/contexts/StorageContext";

export function StorageProvider({ children }: { children: React.ReactNode }) {
  const storage: StorageContextValue = {
    getItem: (key: string) => localStorage.getItem(key),
    setItem: (key: string, value: string) => localStorage.setItem(key, value),
  };

  return <StorageContext value={storage}>{children}</StorageContext>;
}
