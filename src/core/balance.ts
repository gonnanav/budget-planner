import type { BudgetItem, BalanceStatus } from "./types";

export function calculateBalance(
  incomes: BudgetItem[],
  expenses: BudgetItem[],
) {
  const incomeSum = budgetItemsSum(incomes);
  const expenseSum = budgetItemsSum(expenses);
  const balance = incomeSum - expenseSum;
  const status = getStatus(balance);

  return { incomeSum, expenseSum, balance, status };
}

function budgetItemsSum(items: BudgetItem[]): number {
  return items
    .map(normalizeAmount)
    .reduce((sum: number, item) => sum + item, 0);
}

function getStatus(balance: number): BalanceStatus {
  if (balance > 0) return "surplus";
  else if (balance < 0) return "deficit";
  else return "balanced";
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
