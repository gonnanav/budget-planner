import { useEffect, useRef, useContext } from "react";
import { StorageContext } from "@/contexts/StorageContext";

export function useSynchStorage<T>(
  key: string,
  value: T,
  onLoadFromStorage: (value: T) => void,
) {
  const storage = useContext(StorageContext);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    if (!storage || isLoadedRef.current) return;

    try {
      const stored = storage.getItem(key);
      if (stored !== null) {
        onLoadFromStorage(JSON.parse(stored) as T);
      }
    } catch (error) {
      console.error(error);
    } finally {
      isLoadedRef.current = true;
    }
  }, [key, onLoadFromStorage, storage]);

  useEffect(() => {
    if (!storage || !isLoadedRef.current) return;

    try {
      storage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key, value, storage]);
}
