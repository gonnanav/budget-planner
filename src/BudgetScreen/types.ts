export type Section = "income" | "expenses";
export type Entity = "item" | "category";
export type Frequency = "monthly" | "biMonthly";
export type BalanceStatus = "balanced" | "surplus" | "deficit";

export type Loadable<T> =
  | { status: "loading" }
  | { status: "ready"; data: T }
  | { status: "error"; error: Error };

export type ItemInput = {
  name: string;
  amount?: number | null;
  frequency?: Frequency;
  categoryId?: string | null;
  notes?: string;
};

export type CreateItemInput = ItemInput & { id: string };

export type ItemRecord = {
  id: string;
  name: string;
  amount: number | null;
  frequency: Frequency;
  categoryId: string | null;
  notes: string;
};

export type Item = ItemRecord & {
  normalizedAmount: number;
};

export type ItemDraft = {
  id?: string;
  name: string;
  amount: number | null;
  frequency: Frequency;
  categoryId: string | null;
  notes: string;
};

export type ItemGroup = {
  items: Item[];
  total: number;
};

export type CategoryRecord = {
  id: string;
  name: string;
};

export type Category = CategoryRecord & ItemGroup;

export type CategoryInput = {
  name: string;
};

export type CategoryDraft = {
  id?: string;
  name: string;
};

export type EditMode = "create" | "update";

export type EditState =
  | { mode: EditMode; section: Section; entity: "item"; draft: ItemDraft }
  | { mode: EditMode; section: Section; entity: "category"; draft: CategoryDraft };

export type SectionState = ItemGroup & {
  categories: Category[];
  uncategorized: ItemGroup;
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
