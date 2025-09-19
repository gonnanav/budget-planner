import { useState } from "react";
import {
  createBudgetEntries,
  addBudgetEntry,
  updateBudgetEntry,
  removeBudgetEntry,
} from "./budget-entries";
import { BudgetEntry } from "./types";

export function useBudgetEntries(initialEntries?: BudgetEntry[]) {
  const [entries, setEntries] = useState(() =>
    createBudgetEntries(initialEntries),
  );

  const handleAddEntry = (entry: BudgetEntry) => {
    setEntries(addBudgetEntry(entries, entry ?? 0));
  };

  const handleUpdateEntry = (index: number, nextEntry: BudgetEntry) => {
    setEntries(updateBudgetEntry(entries, index, nextEntry));
  };

  const handleDeleteEntry = (index: number) => {
    setEntries(removeBudgetEntry(entries, index));
  };

  return {
    entries,
    handleAddEntry,
    handleUpdateEntry,
    handleDeleteEntry,
  };
}
