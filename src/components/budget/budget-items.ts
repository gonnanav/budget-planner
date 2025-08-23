export function createBudgetItems(budgetItems?: number[]): number[] {
  return budgetItems ?? [0];
}

export function addBudgetItem(budgetItems: number[]): number[] {
  return [...budgetItems, 0];
}

export function updateBudgetItem(
  budgetItems: number[],
  index: number,
  amount: number,
): number[] {
  validateIndex(index, budgetItems);

  const updatedBudgetItems = [...budgetItems];
  updatedBudgetItems[index] = amount;
  return updatedBudgetItems;
}

export function removeBudgetItem(
  budgetItems: number[],
  index: number,
): number[] {
  validateIndex(index, budgetItems);
  if (!canRemoveBudgetItem(budgetItems)) return budgetItems;

  return budgetItems.filter((_, i) => i !== index);
}

export function canRemoveBudgetItem(budgetItems: number[]): boolean {
  return budgetItems.length > 1;
}

export function makeLabel(baseLabel: string) {
  return (index: number) => `${baseLabel} ${index + 1}`;
}

function validateIndex(index: number, budgetItems: number[]) {
  if (index < 0 || index >= budgetItems.length)
    throw new Error("Invalid index");
}
