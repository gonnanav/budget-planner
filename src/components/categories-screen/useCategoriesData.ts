import { Category, Item } from "@/core/types";
import { useLiveQuery } from "dexie-react-hooks";
import { enrichCategory } from "@/core/categories";

interface UseCategoriesDataParams {
  getItems: () => Promise<Item[]>;
  getCategories: () => Promise<Category[]>;
}

export function useCategoriesData({
  getItems,
  getCategories,
}: UseCategoriesDataParams) {
  const items = useLiveQuery(getItems) ?? [];
  const categories = useLiveQuery(getCategories) ?? [];
  const enrichedCategories = categories.map((category) =>
    enrichCategory(category, items),
  );

  return { items, categories: enrichedCategories };
}
