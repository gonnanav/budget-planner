import { createCategorySummary } from "core/categories";
import { sumItems } from "core/items";
import type { Section, SectionState } from "core/types";
import { useItems } from "db/items";
import { useCategories } from "db/categories";

export function useSectionData(section: Section): SectionState {
  const items = useItems(section);
  const itemsLoading = !items;

  const categoryRecords = useCategories(section);
  const categories =
    categoryRecords && items
      ? categoryRecords.map((category) =>
          createCategorySummary(category, items),
        )
      : [];
  const categoriesLoading = !categoryRecords || !items;

  const sum = items ? sumItems(items) : 0;

  return {
    items: { data: items ?? [], isLoading: itemsLoading },
    categories: { data: categories, isLoading: categoriesLoading },
    sum: { data: sum, isLoading: itemsLoading },
  };
}
