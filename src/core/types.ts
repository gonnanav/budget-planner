export type ItemAmount = number | null;
export type Section = "income" | "expenses";
export type Entity = "item" | "category";
export type Frequency = "monthly" | "biMonthly";
export type BalanceStatus = "balanced" | "surplus" | "deficit";
export type Loadable<T> = {
  data: T;
  isLoading: boolean;
};

export interface ItemInput {
  name: string;
  amount?: ItemAmount;
  frequency?: Frequency;
  categoryId?: string;
  notes?: string;
  section: Section;
}

export type CreateItemInput = ItemInput & { id: string };

export interface Item {
  id: string;
  name: string;
  amount: ItemAmount;
  frequency: Frequency;
  categoryId?: string;
  notes?: string;
  normalizedAmount: number;
  section: Section;
}

export interface ItemDraft {
  id?: string;
  name: string;
  amount: ItemAmount;
  frequency: Frequency;
  categoryId?: string;
  notes?: string;
  section: Section;
}

export interface Category {
  id: string;
  name: string;
  section: Section;
}

export interface CategoryInput {
  name: string;
  section: Section;
}

export type CreateCategoryInput = CategoryInput & { id: string };

export interface CategoryDraft {
  id?: string;
  name: string;
  section: Section;
}

export type CategoryWithAmount = Category & { amount: number };

export interface SectionState {
  items: Loadable<Item[]>;
  categories: Loadable<CategoryWithAmount[]>;
  sum: Loadable<number>;
}

export interface Balance {
  status: BalanceStatus;
  delta: number;
}

export interface BudgetState {
  income: SectionState;
  expenses: SectionState;
  balance: Loadable<Balance>;
}
