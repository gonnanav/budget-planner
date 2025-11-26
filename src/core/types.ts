export type ItemAmount = number | null;

export type Frequency = "monthly" | "biMonthly";

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

export type BalanceStatus = "balanced" | "surplus" | "deficit";

export interface Category {
  id: string;
  name: string;
}
