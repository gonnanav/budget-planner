import type { BalanceStatus, Budget, Category, CategoryGroup, CreateCategoryInput, CreateItemInput, Item, SectionState } from "@/domain/types";

export const LIMITS = {
  incomes: 30,
  expenses: 150,
  incomeCategories: 10,
  expenseCategories: 30,
} as const;

export const CHARACTER_LIMITS = {
  itemName: 100,
  categoryName: 50,
  itemNotes: 500,
} as const;

export function createItem(input: CreateItemInput): Item {
  validateItemName(input.name);
  validateNotes(input.notes);
  validateAmount(input.amount);

  const item = {
    id: input.id,
    name: input.name,
    amount: input.amount ?? null,
    frequency: input.frequency ?? "monthly",
    categoryId: input.categoryId ?? null,
    notes: input.notes,
    section: input.section,
  };

  return {
    ...item,
    normalizedAmount: normalizeAmount(item),
  };
}

function validateItemName(name?: string) {
  if (!name) throw new Error("Name is required");
  if (name.length > CHARACTER_LIMITS.itemName)
    throw new Error(
      `Name must be ${CHARACTER_LIMITS.itemName} characters or less`,
    );
}

function validateNotes(notes?: string) {
  if (notes && notes.length > CHARACTER_LIMITS.itemNotes)
    throw new Error(
      `Notes must be ${CHARACTER_LIMITS.itemNotes} characters or less`,
    );
}

function validateAmount(amount?: number | null) {
  if (amount && amount < 0) throw new Error("Amount must be greater than 0");
}

export function sumItems(items: Item[]): number {
  return items.reduce((sum: number, item) => sum + item.normalizedAmount, 0);
}

function normalizeAmount({
  amount,
  frequency,
}: Pick<Item, "amount" | "frequency">): number {
  return (amount ?? 0) / (frequency === "biMonthly" ? 2 : 1);
}

export function createCategory(input: CreateCategoryInput): Category {
  validateCategoryId(input.id);
  validateCategoryName(input.name);

  return {
    id: input.id,
    name: input.name,
    section: input.section,
  };
}

function validateCategoryId(id: string): void {
  validateNonEmptyString(id, "Id");
}

function validateCategoryName(name: string): void {
  validateNonEmptyString(name, "Name");
  if (name.length > CHARACTER_LIMITS.categoryName) {
    throw new Error(
      `Category name must be ${CHARACTER_LIMITS.categoryName} characters or less`,
    );
  }
}

function validateNonEmptyString(value: string, name: string): void {
  if (value.length === 0) {
    throw new Error(`${name} is required`);
  }
}

export function calculateBalance(incomes: Item[], expenses: Item[]) {
  const incomeSum = sumItems(incomes);
  const expenseSum = sumItems(expenses);
  const balance = incomeSum - expenseSum;
  const status = getStatus(balance);

  return { incomeSum, expenseSum, balance, status };
}

function getStatus(balance: number): BalanceStatus {
  if (balance > 0) return "surplus";
  else if (balance < 0) return "deficit";
  else return "balanced";
}

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
