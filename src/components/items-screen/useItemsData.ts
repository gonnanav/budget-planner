import { enrichItem } from "@/core/items";
import { useLiveQuery } from "dexie-react-hooks";
import { Category, Item } from "@/core/types";

interface UseItemsDataParams {
  getItems: () => Promise<Item[]>;
  getCategories: () => Promise<Category[]>;
}

export function useItemsData({ getItems, getCategories }: UseItemsDataParams) {
  const items = useLiveQuery(getItems) || [];
  const enrichedItems = items.map(enrichItem);
  const categories = useLiveQuery(getCategories) || [];
  const categoryOptions = categories.map(({ id, name }) => ({ id, name }));

  return {
    items: enrichedItems,
    categories: categoryOptions,
  };
}
