export type BudgetEntryAmount = number | null;

export type BudgetEntryFrequency = "monthly" | "biMonthly";

export interface BudgetEntryInput {
  name: string;
  amount?: BudgetEntryAmount;
  frequency?: BudgetEntryFrequency;
  categoryId?: string;
}

export type CreateBudgetEntryInput = BudgetEntryInput & { id: string };

export interface BudgetEntry {
  id: string;
  name: string;
  amount: BudgetEntryAmount;
  frequency: BudgetEntryFrequency;
  categoryId?: string;
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
