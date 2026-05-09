import type { BalanceStatus, Budget, Category, CategoryGroup, CreateCategoryInput, CreateItemInput, Item, ItemRecord, SectionState } from "@/domain/types";

export const characterLimits = {
  itemName: 100,
  categoryName: 50,
  itemNotes: 500,
} as const;

export function createBudget(
  income: { items: Item[]; categories: Category[] },
  expenses: { items: Item[]; categories: Category[] },
): Budget {
  const incomeState = createSectionState(income.items, income.categories);
  const expensesState = createSectionState(expenses.items, expenses.categories);
  const delta = incomeState.total - expensesState.total;
  const status = getStatus(delta);

  return {
    income: incomeState,
    expenses: expensesState,
    balance: { status, delta },
  };
}

export function createItemRecord(input: CreateItemInput): ItemRecord {
  return {
    id: input.id,
    name: input.name,
    amount: input.amount ?? null,
    frequency: input.frequency ?? "monthly",
    categoryId: input.categoryId ?? null,
    notes: input.notes,
  };
}

export function createItem(input: CreateItemInput): Item {
  const record = createItemRecord(input);

  return {
    ...record,
    normalizedAmount: normalizeAmount(record),
  };
}

export function createCategory(input: CreateCategoryInput): Category {
  return {
    id: input.id,
    name: input.name,
  };
}

function createSectionState(
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

function sumItems(items: Item[]): number {
  return items.reduce((sum: number, item) => sum + item.normalizedAmount, 0);
}

function getStatus(balance: number): BalanceStatus {
  if (balance > 0) return "surplus";
  else if (balance < 0) return "deficit";
  else return "balanced";
}

function normalizeAmount({
  amount,
  frequency,
}: Pick<Item, "amount" | "frequency">): number {
  return (amount ?? 0) / (frequency === "biMonthly" ? 2 : 1);
}
