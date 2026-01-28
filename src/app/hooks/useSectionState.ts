import { createCategorySummary } from "core/categories";
import { enrichItem, sumItems } from "core/items";
import type { Section, SectionState } from "core/types";
import { useItems } from "db/items";
import { useCategories } from "db/categories";

export function useSectionState(section: Section): SectionState {
  const itemRecords = useItems(section);
  const items = itemRecords ? itemRecords.map(enrichItem) : [];
  const itemsLoading = !itemRecords;

  const categoryRecords = useCategories(section);
  const categories =
    categoryRecords && itemRecords
      ? categoryRecords.map((category) =>
          createCategorySummary(category, items),
        )
      : [];
  const categoriesLoading = !categoryRecords || !itemRecords;

  const sum = itemRecords ? sumItems(items) : 0;

  return {
    items: { data: items, isLoading: itemsLoading },
    categories: { data: categories, isLoading: categoriesLoading },
    sum: { data: sum, isLoading: itemsLoading },
  };
}
