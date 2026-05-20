import type { BalanceStatus, Budget, Category, CreateItemInput, Item, ItemGroup, ItemRecord, SectionState } from "./types";

export const characterLimits = {
  itemName: 100,
  categoryName: 50,
  itemNotes: 500,
} as const;

export function createBudget(
  income: ItemRecord[],
  expenses: ItemRecord[],
): Budget {
  const incomeState = createSectionState(income);
  const expensesState = createSectionState(expenses);
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
    category: input.category ?? "",
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

function createCategory(name: string, items: Item[]): Category {
  return { name, ...createItemGroup(items) };
}

function createSectionState(itemRecords: ItemRecord[]): SectionState {
  const items = itemRecords.map(createItem);
  const itemsByCategory = mapItemsByCategory(items);
  const uncategorized = createItemGroup(itemsByCategory.get("") ?? []);
  const categories: Category[] = [];
  
  for (const [name, items] of itemsByCategory) {
    if (name === "") continue;

    categories.push(createCategory(name, items));
  }

  return { ...createItemGroup(items), categories, uncategorized };
}

function mapItemsByCategory(items: Item[]): Map<string, Item[]> {
  const map = new Map<string, Item[]>();

  for (const item of items) {
    const key = item.category;
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
