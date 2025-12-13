import { CategoryDraft } from "@/components/shared/types";
import { useDraftDrawer } from "@/components/shared";

const DEFAULT_CATEGORY_DRAFT: CategoryDraft = { name: "" };

export function useCategoryDrawer(headingTexts: {
  create: string;
  edit: string;
}) {
  return useDraftDrawer({
    headingTexts,
    defaultDraft: DEFAULT_CATEGORY_DRAFT,
  });
}
