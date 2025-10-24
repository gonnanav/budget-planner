import { useBudgetItems } from "./useBudgetItems";

export function useIncomes() {
  const { items, addItem, updateItem, deleteItem, addItems } =
    useBudgetItems("incomes");

  return {
    incomes: items,
    addIncome: addItem,
    updateIncome: updateItem,
    deleteIncome: deleteItem,
    addIncomes: addItems,
  };
}
