export type BudgetStatus = "balanced" | "positive" | "negative";

export interface BudgetEvaluation {
  balance: number;
  status: BudgetStatus;
}

export function evaluateBudget(
  incomes: number[],
  expenses: number[],
): BudgetEvaluation {
  const totalExpenses = sum(expenses);
  const totalIncomes = sum(incomes);
  const balance = totalIncomes - totalExpenses;

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

function sum(numbers: number[]) {
  return numbers.reduce((sum, number) => sum + number, 0);
}
