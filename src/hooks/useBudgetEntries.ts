import { useLiveQuery } from "dexie-react-hooks";
import { createEntry } from "@/core/budget-entries";
import { BudgetEntry, BudgetEntryInput } from "@/core/types";
import { db } from "@/lib/db";

export function useBudgetEntries(key: string) {
  const entries = useLiveQuery(() => db.table(key).toArray()) as
    | BudgetEntry[]
    | undefined;

  const handleAddEntry = (input: BudgetEntryInput) => {
    db.table(key).add(createEntry({ id: crypto.randomUUID(), ...input }));
  };

  const handleUpdateEntry = (id: string, input: BudgetEntryInput) => {
    db.table(key).update(id, createEntry({ id, ...input }));
  };

  const handleDeleteEntry = (id: string) => {
    db.table(key).delete(id);
  };

  return {
    entries: entries ?? [],
    addEntry: handleAddEntry,
    updateEntry: handleUpdateEntry,
    deleteEntry: handleDeleteEntry,
  };
}
