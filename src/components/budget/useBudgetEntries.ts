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

  const handleAddEntry = (amount: number) => {
    setEntries(addBudgetEntry(entries, amount));
  };

  const handleUpdateEntry = (index: number, amount: number) => {
    setEntries(updateBudgetEntry(entries, index, { amount }));
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
