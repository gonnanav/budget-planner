export function createBudgetEntries(entries?: number[]): number[] {
  return entries ?? [0];
}

export function addBudgetEntry(entries: number[]): number[] {
  return [...entries, 0];
}

export function updateBudgetEntry(
  entries: number[],
  index: number,
  amount: number,
): number[] {
  validateIndex(index, entries);

  const updatedEntries = [...entries];
  updatedEntries[index] = amount;
  return updatedEntries;
}

export function removeBudgetEntry(entries: number[], index: number): number[] {
  validateIndex(index, entries);
  if (!canRemoveBudgetEntry(entries)) return entries;

  return entries.filter((_, i) => i !== index);
}

export function canRemoveBudgetEntry(entries: number[]): boolean {
  return entries.length > 1;
}

export function makeLabel(baseLabel: string) {
  return (index: number) => `${baseLabel} ${index + 1}`;
}

function validateIndex(index: number, entries: number[]) {
  if (index < 0 || index >= entries.length) throw new Error("Invalid index");
}
