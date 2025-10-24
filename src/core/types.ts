export type ItemAmount = number | null;

export type Frequency = "monthly" | "biMonthly";

export interface BudgetItemInput {
  name: string;
  amount?: ItemAmount;
  frequency?: Frequency;
  categoryId?: string;
  notes?: string;
}

export type CreateBudgetItemInput = BudgetItemInput & { id: string };

export interface BudgetItem {
  id: string;
  name: string;
  amount: ItemAmount;
  frequency: Frequency;
  categoryId?: string;
  notes?: string;
}

export type BudgetStatus = "balanced" | "positive" | "negative";

export interface BudgetEvaluation {
  balance: number;
  status: BudgetStatus;
}

export interface Category {
  id: string;
  name: string;
}
