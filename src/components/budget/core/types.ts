export type BudgetEntryAmount = number | null;

export interface BudgetEntryInput {
  amount?: BudgetEntryAmount;
}

export type CreateBudgetEntryInput = BudgetEntryInput & { id: string };

export interface BudgetEntry {
  id: string;
  amount: BudgetEntryAmount;
}

export type BudgetStatus = "balanced" | "positive" | "negative";

export interface BudgetEvaluation {
  balance: number;
  status: BudgetStatus;
}
