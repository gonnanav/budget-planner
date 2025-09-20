import type { BudgetEntry, BudgetEntryInput } from "./types";

export function createBudgetEntry(input?: BudgetEntryInput): BudgetEntry {
  return { amount: input?.amount ?? 0 };
}

export function createBudgetEntries(
  inputs: BudgetEntryInput[] = [],
): BudgetEntry[] {
  return inputs.map((input) => createBudgetEntry(input));
}

export function addBudgetEntry(
  entries: BudgetEntry[],
  input: BudgetEntryInput,
): BudgetEntry[] {
  return [...entries, createBudgetEntry(input)];
}

export function updateBudgetEntry(
  entries: BudgetEntry[],
  index: number,
  input: BudgetEntryInput,
): BudgetEntry[] {
  validateIndex(index, entries);

  const updatedEntries = [...entries];
  updatedEntries[index] = createBudgetEntry(input);

  return updatedEntries;
}

export function deleteBudgetEntry(
  entries: BudgetEntry[],
  index: number,
): BudgetEntry[] {
  validateIndex(index, entries);

  return entries.filter((_, i) => i !== index);
}

function validateIndex(index: number, entries: BudgetEntry[]) {
  if (index < 0 || index >= entries.length) throw new Error("Invalid index");
}
