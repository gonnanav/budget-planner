import type { BudgetEntry, BudgetEntryInput } from "./types";

export function createEntry(input?: BudgetEntryInput): BudgetEntry {
  return { amount: input?.amount ?? 0 };
}

export function addEntry(
  entries: BudgetEntry[],
  input: BudgetEntryInput,
): BudgetEntry[] {
  return [...entries, createEntry(input)];
}

export function updateEntryIn(
  entries: BudgetEntry[],
  index: number,
  input: BudgetEntryInput,
): BudgetEntry[] {
  validateIndex(index, entries);

  const updatedEntries = [...entries];
  updatedEntries[index] = createEntry(input);

  return updatedEntries;
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
