import { createCategorySummary } from "core/categories";
import { sumItems } from "core/items";
import type { Section, Loadable, SectionState } from "core/types";
import { useItems } from "db/items";
import { useCategories } from "db/categories";

export function useSectionState(section: Section): Loadable<SectionState> {
  const items = useItems(section);
  const categories = useCategories(section);

  const isLoading = !items || !categories;

  if (isLoading) {
    return { status: "loading" };
  }

  const categorySummaries = categories.map((category) =>
    createCategorySummary(category, items),
  );
  const sum = sumItems(items);

  return {
    status: "ready",
    data: {
      items,
      categories: categorySummaries,
      sum,
    },
  };
}
