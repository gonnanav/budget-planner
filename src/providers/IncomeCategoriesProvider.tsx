import { IncomeCategoryContext } from "@/contexts/IncomeCategoryContext";
import { useCategories } from "@/hooks/useCategories";

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

  const incomeCategoriesContext = {
    incomeCategories: categories,
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
