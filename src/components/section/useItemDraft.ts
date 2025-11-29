import { useState } from "react";
import { ItemDraft } from "@/components/shared/types";

const initialDraft: ItemDraft = {
  name: "",
  amount: null,
  frequency: "monthly",
  notes: "",
};

export function useItemDraft() {
  const [draft, setDraft] = useState(initialDraft);

  const updateDraft = (changes: Partial<ItemDraft>) => {
    setDraft((prev) => ({ ...prev, ...changes }));
  };

  const resetDraft = () => {
    setDraft(initialDraft);
  };

  return {
    itemDraft: draft,
    updateItemDraft: updateDraft,
    resetItemDraft: resetDraft,
  };
}
