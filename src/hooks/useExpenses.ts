import { useBudgetItems } from "./useBudgetItems";

export function useExpenses() {
  const { items, addItem, updateItem, deleteItem, addItems, isAtLimit } =
    useBudgetItems("expenses");

  return {
    expenses: items,
    addExpense: addItem,
    updateExpense: updateItem,
    deleteExpense: deleteItem,
    addExpenses: addItems,
    isExpenseAtLimit: isAtLimit,
  };
}
