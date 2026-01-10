import { useDraft, type UseDraftResult } from "./useDraft";
import type { CategoryDraft } from "./types";

const PRISTINE_DRAFT: CategoryDraft = {
  name: "",
};

export function useCategoryDraft(): UseDraftResult<CategoryDraft> {
  return useDraft(PRISTINE_DRAFT);
}
