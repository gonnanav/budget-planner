import { useBudgetItems } from "./useBudgetItems";
import { enrichItem } from "@/core/budget-items";

export function useIncomes() {
  const { items, addItem, updateItem, deleteItem, addItems, isAtLimit } =
    useBudgetItems("incomes");

  const enrichedIncomes = items.map(enrichItem);

  return {
    incomes: enrichedIncomes,
    addIncome: addItem,
    updateIncome: updateItem,
    deleteIncome: deleteItem,
    addIncomes: addItems,
    isIncomeAtLimit: isAtLimit,
  };
}
