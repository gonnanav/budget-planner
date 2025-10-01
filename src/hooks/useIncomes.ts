import { useBudgetEntries } from "./useBudgetEntries";
import { BudgetEntry } from "@/core/types";

export function useIncomes(initialIncomes?: BudgetEntry[]) {
  const { entries, addEntry, updateEntry, deleteEntry } = useBudgetEntries(
    "incomes",
    initialIncomes,
  );

  return {
    incomes: entries,
    addIncome: addEntry,
    updateIncome: updateEntry,
    deleteIncome: deleteEntry,
  };
}
