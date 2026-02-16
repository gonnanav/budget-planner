import type { Item, BalanceStatus } from "../types";
import { sumItems } from "../items";

export function calculateBalance(incomes: Item[], expenses: Item[]) {
  const incomeSum = sumItems(incomes);
  const expenseSum = sumItems(expenses);
  const balance = incomeSum - expenseSum;
  const status = getStatus(balance);

  return { incomeSum, expenseSum, balance, status };
}

function getStatus(balance: number): BalanceStatus {
  if (balance > 0) return "surplus";
  else if (balance < 0) return "deficit";
  else return "balanced";
}
