import type { BudgetEntry } from "./types";

export function createBudgetEntries(entries?: BudgetEntry[]): BudgetEntry[] {
  return entries ?? [null];
}

export function addBudgetEntry(
  entries: BudgetEntry[],
  amount?: number,
): BudgetEntry[] {
  return [...entries, amount ?? null];
}

export function updateBudgetEntry(
  entries: BudgetEntry[],
  index: number,
  entry: BudgetEntry,
): BudgetEntry[] {
  validateIndex(index, entries);

  const updatedEntries = [...entries];
  updatedEntries[index] = entry;
  return updatedEntries;
}

export function removeBudgetEntry(
  entries: BudgetEntry[],
  index: number,
): BudgetEntry[] {
  validateIndex(index, entries);
  if (!canRemoveBudgetEntry(entries)) return entries;

  return entries.filter((_, i) => i !== index);
}

export function canRemoveBudgetEntry(entries: BudgetEntry[]): boolean {
  return entries.length > 1;
}

export function makeLabel(baseLabel: string) {
  return (index: number) => `${baseLabel} ${index + 1}`;
}

function validateIndex(index: number, entries: BudgetEntry[]) {
  if (index < 0 || index >= entries.length) throw new Error("Invalid index");
}
