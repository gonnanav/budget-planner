import type { BudgetItem, BudgetEvaluation, BudgetStatus } from "./types";

export function budgetBalance(
  incomes: BudgetItem[],
  expenses: BudgetItem[],
): BudgetEvaluation {
  const incomeSum = budgetItemsSum(incomes);
  const expenseSum = budgetItemsSum(expenses);
  const balance = incomeSum - expenseSum;

  let status: BudgetStatus = "balanced";
  if (balance > 0) {
    status = "positive";
  } else if (balance < 0) {
    status = "negative";
  }

  return {
    incomeSum,
    expenseSum,
    balance,
    status,
  };
}

function budgetItemsSum(items: BudgetItem[]): number {
  return items
    .map(normalizeAmount)
    .reduce((sum: number, item) => sum + item, 0);
}

export function normalizeAmount(item: BudgetItem): number {
  return (item.amount ?? 0) / (item.frequency === "biMonthly" ? 2 : 1);
}

export function calculateCategoryTotal(
  categoryId: string,
  items: BudgetItem[],
): number {
  return items
    .filter((item) => item.categoryId === categoryId)
    .map(normalizeAmount)
    .reduce((sum, amount) => sum + amount, 0);
}
