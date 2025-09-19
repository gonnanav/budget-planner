export type BudgetStatus = "balanced" | "positive" | "negative";
export interface BudgetEntry {
  amount: number;
}

export interface BudgetEvaluation {
  balance: number;
  status: BudgetStatus;
}
