import { useBudgetItems } from "./useBudgetItems";
import { enrichItem } from "@/core/budget-items";

export function useExpenses() {
  const { items, addItem, updateItem, deleteItem, addItems, isAtLimit } =
    useBudgetItems("expenses");

  const enrichedExpenses = items.map(enrichItem);

  return {
    expenses: enrichedExpenses,
    addExpense: addItem,
    updateExpense: updateItem,
    deleteExpense: deleteItem,
    addExpenses: addItems,
    isExpenseAtLimit: isAtLimit,
  };
}
