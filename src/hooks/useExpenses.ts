import { useBudgetEntries } from "./useBudgetEntries";

export function useExpenses() {
  const { entries, addEntry, updateEntry, deleteEntry, addEntries } =
    useBudgetEntries("expenses");

  return {
    expenses: entries,
    addExpense: addEntry,
    updateExpense: updateEntry,
    deleteExpense: deleteEntry,
    addExpenses: addEntries,
  };
}
