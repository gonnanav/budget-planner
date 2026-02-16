import { useContext } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import type { Item, Category, Loadable, Section } from "domain/types";
import { ServicesContext } from "contexts/ServicesContext";

type BudgetData = {
  items: Item[];
  categories: Category[];
};

export function useBudgetData(section: Section): Loadable<BudgetData> {
  const { budgetService } = useContext(ServicesContext);

  return useLiveQuery(
    async () => {
      const [items, categories] = await Promise.all([
        budgetService.getItems(section),
        budgetService.getCategories(section),
      ]);

      return { status: "ready" as const, data: { items, categories } };
    },
    [section],
    { status: "loading" as const }
  );
}
