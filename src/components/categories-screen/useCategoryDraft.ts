import { useState } from "react";
import { CategoryDraft } from "@/components/shared/types";

const initialDraft: CategoryDraft = { name: "" };

export function useCategoryDraft() {
  const [draft, setDraft] = useState(initialDraft);

  const updateDraft = (changes: Partial<CategoryDraft>) => {
    setDraft((prev) => ({ ...prev, ...changes }));
  };

  const resetDraft = () => {
    setDraft(initialDraft);
  };

  return {
    draft,
    updateDraft,
    resetDraft,
  };
}
