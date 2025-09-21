import { useState } from "react";
import {
  addBudgetEntry,
  updateBudgetEntry,
  deleteBudgetEntry,
} from "./core/budget-entries";
import { BudgetEntry, BudgetEntryInput } from "./core/types";

export function useBudgetEntries(initialEntries: BudgetEntry[] = []) {
  const [entries, setEntries] = useState(initialEntries);

  const handleAddEntry = (input: BudgetEntryInput) => {
    setEntries(addBudgetEntry(entries, input));
  };

  const handleUpdateEntry = (index: number, input: BudgetEntryInput) => {
    setEntries(updateBudgetEntry(entries, index, input));
  };

  const handleDeleteEntry = (index: number) => {
    setEntries(deleteBudgetEntry(entries, index));
  };

  return {
    entries,
    handleAddEntry,
    handleUpdateEntry,
    handleDeleteEntry,
  };
}
