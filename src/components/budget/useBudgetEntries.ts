import { useState } from "react";
import {
  createBudgetEntries,
  addBudgetEntry,
  updateBudgetEntry,
  deleteBudgetEntry,
} from "./core/budget-entries";
import { BudgetEntryInput } from "./core/types";

export function useBudgetEntries(initialEntries?: BudgetEntryInput[]) {
  const [entries, setEntries] = useState(() =>
    createBudgetEntries(initialEntries),
  );

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
