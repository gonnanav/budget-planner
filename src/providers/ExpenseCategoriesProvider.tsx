import { useContext } from "react";
import { ExpenseCategoryContext } from "@/contexts/ExpenseCategoryContext";
import { ExpenseContext } from "@/contexts/ExpenseContext";
import { useCategories } from "@/hooks/useCategories";
import { enrichCategory } from "@/core/categories";

interface ExpenseCategoriesProviderProps {
  children: React.ReactNode;
}

export function ExpenseCategoriesProvider({
  children,
}: ExpenseCategoriesProviderProps) {
  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    addCategories,
    isAtLimit,
  } = useCategories("expenseCategories");

  const { expenses } = useContext(ExpenseContext);

  const enrichedExpenseCategories = categories.map((category) =>
    enrichCategory(category, expenses),
  );

  const expenseCategoriesContext = {
    expenseCategories: enrichedExpenseCategories,
    addExpenseCategory: addCategory,
    updateExpenseCategory: updateCategory,
    deleteExpenseCategory: deleteCategory,
    addExpenseCategories: addCategories,
    isExpenseCategoryAtLimit: isAtLimit,
  };

  return (
    <ExpenseCategoryContext value={expenseCategoriesContext}>
      {children}
    </ExpenseCategoryContext>
  );
}
