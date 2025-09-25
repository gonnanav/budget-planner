import { BudgetEntry } from "../core/types";
import { useBudgetEntries } from "./useBudgetEntries";

export function useExpenses(initialExpenses?: BudgetEntry[]) {
  const { entries, addEntry, updateEntry, deleteEntry } = useBudgetEntries(
    "expenses",
    initialExpenses,
  );

  return {
    expenses: entries,
    addExpense: addEntry,
    updateExpense: updateEntry,
    deleteExpense: deleteEntry,
  };
}
