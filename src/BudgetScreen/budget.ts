import type { BalanceStatus, Budget, Category, CategoryRecord, CreateItemInput, Item, ItemGroup, ItemRecord, SectionState } from "./types";

export const characterLimits = {
  itemName: 100,
  categoryName: 50,
  itemNotes: 500,
} as const;

export function createBudget(
  income: { items: ItemRecord[]; categories: CategoryRecord[] },
  expenses: { items: ItemRecord[]; categories: CategoryRecord[] },
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
    notes: input.notes ?? "",
  };
}

function createItem(record: ItemRecord): Item {
  return {
    ...record,
    normalizedAmount: normalizeAmount(record),
  };
}


function createItemGroup(items: Item[]): ItemGroup {
  return { items, total: sumItems(items) };
}

function createCategory(record: CategoryRecord, itemsByCategory: Map<string | null, Item[]>): Category {
  const items = itemsByCategory.get(record.id) ?? [];

  return { ...record, ...createItemGroup(items) };
}

function createSectionState(
  itemRecords: ItemRecord[],
  categoryRecords: CategoryRecord[],
): SectionState {
  const items = itemRecords.map(createItem);
  const itemsByCategory = mapItemsByCategory(items);
  const categories = categoryRecords.map((record) => createCategory(record, itemsByCategory));
  const uncategorized = createItemGroup(itemsByCategory.get(null) ?? []);

  return { ...createItemGroup(items), categories, uncategorized };
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
