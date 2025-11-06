import { BudgetItem } from "@/core/types";
import { useCategories } from "./useCategories";
import { enrichCategory } from "@/core/categories";

type EnrichedExpenseItem = BudgetItem & { normalizedAmount: number };

export function useExpenseCategories(expenseItems: EnrichedExpenseItem[]) {
  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    addCategories,
    isAtLimit,
  } = useCategories("expenseCategories");

  const enrichedExpenseCategories = categories.map((category) =>
    enrichCategory(category, expenseItems),
  );

  return {
    expenseCategories: enrichedExpenseCategories,
    addExpenseCategory: addCategory,
    updateExpenseCategory: updateCategory,
    deleteExpenseCategory: deleteCategory,
    addExpenseCategories: addCategories,
    isExpenseCategoryAtLimit: isAtLimit,
  };
}
