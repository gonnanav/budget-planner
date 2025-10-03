import { useBudgetEntries } from "./useBudgetEntries";

export function useIncomes() {
  const { entries, addEntry, updateEntry, deleteEntry } =
    useBudgetEntries("incomes");

  return {
    incomes: entries,
    addIncome: addEntry,
    updateIncome: updateEntry,
    deleteIncome: deleteEntry,
  };
}
