import { useDraft, type UseDraftResult } from "./useDraft";
import type { ItemDraft } from "./types";

const PRISTINE_DRAFT: ItemDraft = {
  name: "",
  amount: null,
  frequency: "monthly",
  notes: "",
};

export function useItemDraft(): UseDraftResult<ItemDraft> {
  return useDraft(PRISTINE_DRAFT);
}
