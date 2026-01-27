import { createCategorySummary } from "core/categories";
import { sumItems } from "core/items";
import type { Section, Loadable, SectionState } from "core/types";
import { useItems } from "db/items";
import { useCategories } from "db/categories";

export function useSectionData(section: Section): Loadable<SectionState> {
  const items = useItems(section);
  const categoryRecords = useCategories(section);

  const isLoading = !items || !categoryRecords;

  if (isLoading) {
    return { status: "loading" };
  }

  const categories = categoryRecords.map((category) =>
    createCategorySummary(category, items),
  );
  const sum = sumItems(items);

  return {
    status: "ready",
    data: {
      items,
      categories,
      sum,
    },
  };
}
