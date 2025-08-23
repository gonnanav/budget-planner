export type BudgetStatus = "balanced" | "positive" | "negative";
export type BudgetEntry = number | null;

export interface BudgetEvaluation {
  balance: number;
  status: BudgetStatus;
}
