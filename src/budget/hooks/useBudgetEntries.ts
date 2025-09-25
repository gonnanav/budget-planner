import { useState } from "react";
import { addEntry, updateEntryIn, removeEntry } from "../core/budget-entries";
import { BudgetEntry, BudgetEntryInput } from "../core/types";
import { useSynchStorage } from "@/hooks/useSynchStorage";

export function useBudgetEntries(
  key: string,
  initialEntries: BudgetEntry[] = [],
) {
  const [entries, setEntries] = useState(initialEntries);
  useSynchStorage(key, entries, setEntries);

  const handleAddEntry = (input: BudgetEntryInput) => {
    setEntries(addEntry(entries, { id: crypto.randomUUID(), ...input }));
  };

  const handleUpdateEntry = (index: number, input: BudgetEntryInput) => {
    setEntries(updateEntryIn(entries, index, input));
  };

  const handleDeleteEntry = (index: number) => {
    setEntries(removeEntry(entries, index));
  };

  return {
    entries,
    handleAddEntry,
    handleUpdateEntry,
    handleDeleteEntry,
  };
}
