import { useState } from "react";

export function useDraft<T>(defaultDraft: T) {
  const [draft, setDraft] = useState<T>(defaultDraft);

  const updateDraft = (changes: Partial<T>) => {
    setDraft((prev) => ({ ...prev, ...changes }));
  };

  const resetDraft = () => {
    setDraft(defaultDraft);
  };

  return {
    draft,
    updateDraft,
    resetDraft,
  };
}
