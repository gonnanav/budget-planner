import type { Budget, Category, CategoryGroup, Item, SectionState } from "domain/types";
import { calculateBalance } from "domain/balance";
import { sumItems } from "domain/items";

export function createSectionState(
  items: Item[],
  categories: Category[],
): SectionState {
  return {
    items,
    categories,
    groups: createCategoryGroups(items, categories),
    total: sumItems(items),
  };
}

function createCategoryGroups(items: Item[], categories: Category[]): CategoryGroup[] {
  if (categories.length === 0) return [];

  const itemsByCategory = mapItemsByCategory(items);

  const groups: CategoryGroup[] = categories.map((category) => {
    const categoryItems = itemsByCategory.get(category.id) ?? [];
    return {
      kind: "categorized",
      category,
      items: categoryItems,
      total: sumItems(categoryItems),
    };
  });

  const uncategorized = itemsByCategory.get(null);
  if (uncategorized) {
    groups.push({
      kind: "uncategorized",
      items: uncategorized,
      total: sumItems(uncategorized),
    });
  }

  return groups;
}

function mapItemsByCategory(items: Item[]): Map<string | null, Item[]> {
  const map = new Map<string | null, Item[]>();

  for (const item of items) {
    const key = item.categoryId;
    const bucket = map.get(key);

    if (bucket) {
      bucket.push(item);
    } else {
      map.set(key, [item]);
    }
  }

  return map;
}

export function createBudget(
  income: SectionState,
  expenses: SectionState,
): Budget {
  const balanceData = calculateBalance(income.items, expenses.items);

  return {
    income,
    expenses,
    balance: {
      status: balanceData.status,
      delta: balanceData.balance,
    },
  };
}
