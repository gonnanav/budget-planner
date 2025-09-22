import type {
  BudgetEntry,
  BudgetEntryInput,
  CreateBudgetEntryInput,
} from "./types";

export function createEntry(input: CreateBudgetEntryInput): BudgetEntry {
  return { amount: null, ...input };
}

function updateEntry(entry: BudgetEntry, input: BudgetEntryInput): BudgetEntry {
  return { ...entry, ...input };
}

export function addEntry(
  entries: BudgetEntry[],
  input: CreateBudgetEntryInput,
): BudgetEntry[] {
  return [...entries, createEntry(input)];
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
