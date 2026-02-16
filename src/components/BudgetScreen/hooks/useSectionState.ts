import { createCategorySummary } from "domain/categories";
import { sumItems } from "domain/items";
import type { Section, Loadable, SectionState } from "domain/types";
import { useItems } from "./useItems";
import { useCategories } from "./useCategories";

export function useSectionState(section: Section): Loadable<SectionState> {
  const itemsLoadable = useItems(section);
  const categoriesLoadable = useCategories(section);

  if (
    itemsLoadable.status !== "ready" ||
    categoriesLoadable.status !== "ready"
  ) {
    return { status: "loading" };
  }

  const items = itemsLoadable.data;
  const categories = categoriesLoadable.data;

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
