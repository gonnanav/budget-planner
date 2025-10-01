import type { BudgetEntry, BudgetEvaluation, BudgetStatus } from "./types";

export function budgetBalance(
  incomes: BudgetEntry[],
  expenses: BudgetEntry[],
): BudgetEvaluation {
  const totalExpenses = budgetEntriesSum(expenses);
  const totalIncomes = budgetEntriesSum(incomes);
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

export function budgetEntriesSum(entries: BudgetEntry[]): number {
  return entries
    .map(normalizeAmount)
    .reduce((sum: number, entry) => sum + entry, 0);
}

export function normalizeAmount(entry: BudgetEntry): number {
  return (entry.amount ?? 0) / (entry.frequency === "biMonthly" ? 2 : 1);
}
