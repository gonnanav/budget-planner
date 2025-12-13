import { ItemDraft } from "@/components/shared/types";
import { useDraftDrawer } from "@/components/shared";

const DEFAULT_ITEM_DRAFT: ItemDraft = {
  name: "",
  amount: null,
  frequency: "monthly",
  notes: "",
};

export function useItemDrawer(headingTexts: { create: string; edit: string }) {
  return useDraftDrawer({
    headingTexts,
    defaultDraft: DEFAULT_ITEM_DRAFT,
  });
}
