export type BudgetStatus = "balanced" | "positive" | "negative";

export interface BudgetEntryInput {
  amount?: number | null;
}

export interface BudgetEntry {
  id: string;
  amount: number | null;
}

export interface BudgetEvaluation {
  balance: number;
  status: BudgetStatus;
}
