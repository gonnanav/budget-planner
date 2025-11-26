import type { Item, BalanceStatus } from "./types";

export function calculateBalance(incomes: Item[], expenses: Item[]) {
  const incomeSum = sumItems(incomes);
  const expenseSum = sumItems(expenses);
  const balance = incomeSum - expenseSum;
  const status = getStatus(balance);

  return { incomeSum, expenseSum, balance, status };
}

function sumItems(items: Item[]): number {
  return items
    .map(normalizeAmount)
    .reduce((sum: number, item) => sum + item, 0);
}

function getStatus(balance: number): BalanceStatus {
  if (balance > 0) return "surplus";
  else if (balance < 0) return "deficit";
  else return "balanced";
}

export function normalizeAmount(item: Item): number {
  return (item.amount ?? 0) / (item.frequency === "biMonthly" ? 2 : 1);
}

export function calculateCategoryTotal(
  categoryId: string,
  items: Item[],
): number {
  return items
    .filter((item) => item.categoryId === categoryId)
    .map(normalizeAmount)
    .reduce((sum, amount) => sum + amount, 0);
}
