export type Section = "income" | "expenses";
export type Entity = "item" | "category";
export type Frequency = "monthly" | "biMonthly";
export type BalanceStatus = "balanced" | "surplus" | "deficit";

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

export type EditState =
  | { entity: "item"; mode: "create"; section: Section; draft: ItemInput }
  | { entity: "item"; mode: "update"; section: Section; id: string; draft: ItemInput }
  | { entity: "category"; mode: "create"; section: Section; draft: CategoryInput }
  | { entity: "category"; mode: "update"; section: Section; id: string; draft: CategoryInput };

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
