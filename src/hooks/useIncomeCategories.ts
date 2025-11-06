import { useCategories } from "./useCategories";
import { enrichCategory } from "@/core/categories";
import { BudgetItem } from "@/core/types";

type EnrichedIncomeItem = BudgetItem & { normalizedAmount: number };

export function useIncomeCategories(incomeItems: EnrichedIncomeItem[]) {
  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    addCategories,
    isAtLimit,
  } = useCategories("incomeCategories");

  const enrichedIncomeCategories = categories.map((category) =>
    enrichCategory(category, incomeItems),
  );

  return {
    incomeCategories: enrichedIncomeCategories,
    addIncomeCategory: addCategory,
    updateIncomeCategory: updateCategory,
    deleteIncomeCategory: deleteCategory,
    addIncomeCategories: addCategories,
    isIncomeCategoryAtLimit: isAtLimit,
  };
}
