import type { BudgetEntry, BudgetEntryInput } from "./types";

export function createEntry(id: string, input?: BudgetEntryInput): BudgetEntry {
  return { amount: null, id, ...input };
}

function updateEntry(entry: BudgetEntry, input: BudgetEntryInput): BudgetEntry {
  return { ...entry, ...input };
}

export function addEntry(
  entries: BudgetEntry[],
  id: string,
  input: BudgetEntryInput,
): BudgetEntry[] {
  return [...entries, createEntry(id, input)];
}

export function updateEntryIn(
  entries: BudgetEntry[],
  index: number,
  input: BudgetEntryInput,
): BudgetEntry[] {
  validateIndex(index, entries);

  const updated = [...entries];
  updated[index] = updateEntry(entries[index], input);

  return updated;
}

export function removeEntry(
  entries: BudgetEntry[],
  index: number,
): BudgetEntry[] {
  validateIndex(index, entries);

  return entries.filter((_, i) => i !== index);
}

function validateIndex(index: number, entries: BudgetEntry[]) {
  if (index < 0 || index >= entries.length) throw new Error("Invalid index");
}
