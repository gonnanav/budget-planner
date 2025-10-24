import { ExpenseCategoryContext } from "@/contexts/ExpenseCategoryContext";
import { useCategories } from "@/hooks/useCategories";

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

  const expenseCategoriesContext = {
    expenseCategories: categories,
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
