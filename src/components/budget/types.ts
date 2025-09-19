export type BudgetStatus = "balanced" | "positive" | "negative";
export interface BudgetEntry {
  amount: number | null;
}

export interface BudgetEvaluation {
  balance: number;
  status: BudgetStatus;
}
