import { createCategorySummary } from "domain/categories";
import { sumItems } from "domain/items";
import type { Section, Loadable, SectionState } from "domain/types";
import { useBudgetData } from "./useBudgetData";

export function useSectionState(section: Section): Loadable<SectionState> {
  const budgetData = useBudgetData(section);

  if (budgetData.status !== "ready") {
    return { status: "loading" };
  }

  const { items, categories } = budgetData.data;

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
