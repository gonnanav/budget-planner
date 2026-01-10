import { useState } from "react";

export type UseDraftResult<T> = {
  value: T | null;
  reset: () => void;
  set: (nextDraft: T) => void;
  update: (changes: Partial<T>) => void;
  clear: () => void;
};

export function useDraft<T>(pristineValue: T): UseDraftResult<T> {
  const [value, setValue] = useState<T | null>(null);

  const reset = () => {
    setValue(pristineValue);
  };

  const update = (changes: Partial<T>) => {
    setValue((prev) => prev && { ...prev, ...changes });
  };

  const clear = () => {
    setValue(null);
  };

  return {
    value,
    reset,
    set: setValue,
    update,
    clear,
  };
}
