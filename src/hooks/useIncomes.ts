import { useBudgetEntries } from "./useBudgetEntries";

export function useIncomes() {
  const { entries, addEntry, updateEntry, deleteEntry, addEntries } =
    useBudgetEntries("incomes");

  return {
    incomes: entries,
    addIncome: addEntry,
    updateIncome: updateEntry,
    deleteIncome: deleteEntry,
    addIncomes: addEntries,
  };
}
