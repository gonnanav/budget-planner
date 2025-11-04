import { useContext } from "react";
import { IncomeCategoryContext } from "@/contexts/IncomeCategoryContext";
import { IncomeContext } from "@/contexts/IncomeContext";
import { useCategories } from "@/hooks/useCategories";
import { enrichCategory } from "@/core/categories";

interface IncomeCategoriesProviderProps {
  children: React.ReactNode;
}

export function IncomeCategoriesProvider({
  children,
}: IncomeCategoriesProviderProps) {
  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    addCategories,
    isAtLimit,
  } = useCategories("incomeCategories");

  const { incomes } = useContext(IncomeContext);

  const enrichedIncomeCategories = categories.map((category) =>
    enrichCategory(category, incomes),
  );

  const incomeCategoriesContext = {
    incomeCategories: enrichedIncomeCategories,
    addIncomeCategory: addCategory,
    updateIncomeCategory: updateCategory,
    deleteIncomeCategory: deleteCategory,
    addIncomeCategories: addCategories,
    isIncomeCategoryAtLimit: isAtLimit,
  };

  return (
    <IncomeCategoryContext value={incomeCategoriesContext}>
      {children}
    </IncomeCategoryContext>
  );
}
