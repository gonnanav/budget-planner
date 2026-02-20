export type Section = "income" | "expenses";
export type Entity = "item" | "category";
export type Frequency = "monthly" | "biMonthly";
export type BalanceStatus = "balanced" | "surplus" | "deficit";

export type Loadable<T> =
  | { status: "loading" }
  | { status: "ready"; data: T }
  | { status: "error"; error: Error };

export interface ItemInput {
  section: Section;
  name: string;
  amount?: number | null;
  frequency?: Frequency;
  categoryId?: string;
  notes?: string;
}

export type CreateItemInput = ItemInput & { id: string };

export interface Item {
  id: string;
  section: Section;
  name: string;
  amount: number | null;
  frequency: Frequency;
  categoryId?: string;
  notes?: string;
  normalizedAmount: number;
}

export interface ItemDraft {
  id?: string;
  section: Section;
  name: string;
  amount: number | null;
  frequency: Frequency;
  categoryId?: string;
  notes?: string;
}

export interface Category {
  section: Section;
  id: string;
  name: string;
}

export interface CategoryInput {
  section: Section;
  name: string;
}

export type CreateCategoryInput = CategoryInput & { id: string };

export interface CategoryDraft {
  id?: string;
  section: Section;
  name: string;
}

export interface CategorySummary {
  category: Category;
  total: number;
}

export interface SectionState {
  items: Item[];
  categories: CategorySummary[];
  sum: number;
}

export interface Balance {
  status: BalanceStatus;
  delta: number;
}

export interface Budget {
  income: SectionState;
  expenses: SectionState;
  balance: Balance;
}

export interface BackupData {
  metadata: {
    version: string;
    exportedAt: string;
  };
  data: {
    incomeItems: Omit<Item, "normalizedAmount" | "section">[];
    incomeCategories: Omit<Category, "section">[];
    expenseItems: Omit<Item, "normalizedAmount" | "section">[];
    expenseCategories: Omit<Category, "section">[];
  };
}
