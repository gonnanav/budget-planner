export type Section = "income" | "expenses";
export type Entity = "item" | "category";
export type Frequency = "monthly" | "biMonthly";
export type BalanceStatus = "balanced" | "surplus" | "deficit";

export type Loadable<T> =
  | { status: "loading" }
  | { status: "ready"; data: T }
  | { status: "error"; error: Error };

export type ItemInput = {
  section: Section;
  name: string;
  amount?: number | null;
  frequency?: Frequency;
  categoryId?: string | null;
  notes?: string;
};

export type CreateItemInput = ItemInput & { id: string };

export type Item = {
  id: string;
  section: Section;
  name: string;
  amount: number | null;
  frequency: Frequency;
  categoryId: string | null;
  notes?: string;
  normalizedAmount: number;
};

export type ItemDraft = {
  id?: string;
  section: Section;
  name: string;
  amount: number | null;
  frequency: Frequency;
  categoryId: string | null;
  notes?: string;
};

export type Category = {
  section: Section;
  id: string;
  name: string;
};

export type CategoryInput = {
  section: Section;
  name: string;
};

export type CreateCategoryInput = CategoryInput & { id: string };

export type CategoryDraft = {
  id?: string;
  section: Section;
  name: string;
};

export type EditMode = "create" | "update";

export type EditState =
  | { mode: EditMode; entity: "item"; draft: ItemDraft }
  | { mode: EditMode; entity: "category"; draft: CategoryDraft };

export type CategoryGroup =
  | { kind: "categorized"; category: Category; items: Item[]; total: number }
  | { kind: "uncategorized"; items: Item[]; total: number };

export type SectionState = {
  items: Item[];
  categories: Category[];
  groups: CategoryGroup[];
  total: number;
};

export type Balance = {
  status: BalanceStatus;
  delta: number;
};

export type Budget = {
  income: SectionState;
  expenses: SectionState;
  balance: Balance;
};

export type BackupData = {
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
};
