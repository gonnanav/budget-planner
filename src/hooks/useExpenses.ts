import { useBudgetEntries } from "./useBudgetEntries";

export function useExpenses() {
  const { entries, addEntry, updateEntry, deleteEntry } =
    useBudgetEntries("expenses");

  return {
    expenses: entries,
    addExpense: addEntry,
    updateExpense: updateEntry,
    deleteExpense: deleteEntry,
  };
}
