export type ItemAmount = number | null;
export type Section = "income" | "expenses";
export type Unit = "item" | "category";
export type Frequency = "monthly" | "biMonthly";
export type BalanceStatus = "balanced" | "surplus" | "deficit";

export interface ItemInput {
  name: string;
  amount?: ItemAmount;
  frequency?: Frequency;
  categoryId?: string;
  notes?: string;
}

export type CreateItemInput = ItemInput & { id: string };

export interface Item {
  id: string;
  name: string;
  amount: ItemAmount;
  frequency: Frequency;
  categoryId?: string;
  notes?: string;
}

export interface Category {
  id: string;
  name: string;
}
