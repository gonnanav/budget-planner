export type BudgetStatus = "balanced" | "positive" | "negative";

export interface BudgetEvaluation {
  balance: number;
  status: BudgetStatus;
}

export function evaluateBudget(
  incomes: number,
  expenses: number[],
): BudgetEvaluation {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense, 0);
  const balance = incomes - totalExpenses;

  let status: BudgetStatus = "balanced";
  if (balance > 0) {
    status = "positive";
  } else if (balance < 0) {
    status = "negative";
  }

  return {
    balance,
    status,
  };
}
