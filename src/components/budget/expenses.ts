export function createExpenses(expenses?: number[]): number[] {
  return expenses ?? [0];
}

export function addExpense(expenses: number[]): number[] {
  return [...expenses, 0];
}

export function updateExpense(
  expenses: number[],
  index: number,
  amount: number,
): number[] {
  validateIndex(index, expenses);

  const updatedExpenses = [...expenses];
  updatedExpenses[index] = amount;
  return updatedExpenses;
}

export function removeExpense(expenses: number[], index: number): number[] {
  validateIndex(index, expenses);
  if (!canRemoveExpense(expenses)) return expenses;

  return expenses.filter((_, i) => i !== index);
}

export function canRemoveExpense(expenses: number[]): boolean {
  return expenses.length > 1;
}

export function expenseLabel(index: number) {
  return `Expense ${index + 1}`;
}

function validateIndex(index: number, expenses: number[]) {
  if (index < 0 || index >= expenses.length) throw new Error("Invalid index");
}
