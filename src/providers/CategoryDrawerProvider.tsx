import { useState, useContext } from "react";
import { addToast } from "@heroui/toast";
import { CategoryDrawerContext } from "@/contexts/CategoryDrawerContext";
import { Category } from "@/core/types";
import { IncomeCategoryContext } from "@/contexts/IncomeCategoryContext";
import { ExpenseCategoryContext } from "@/contexts/ExpenseCategoryContext";

export function CategoryDrawerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<"income" | "expense">("income");
  const [isOpen, setIsOpen] = useState(false);
  const [editedCategory, setEditedCategory] = useState<Category | null>(null);
  const {
    incomeCategories,
    addIncomeCategory,
    updateIncomeCategory,
    deleteIncomeCategory,
    isIncomeCategoryAtLimit,
  } = useContext(IncomeCategoryContext);
  const {
    expenseCategories,
    addExpenseCategory,
    updateExpenseCategory,
    deleteExpenseCategory,
    isExpenseCategoryAtLimit,
  } = useContext(ExpenseCategoryContext);

  const handleOpen = (mode: "income" | "expense" = "income") => {
    if (mode === "income" && isIncomeCategoryAtLimit) {
      addToast({
        title: "Limit reached",
        description: "You've reached the maximum number of income categories.",
        color: "warning",
      });
      return;
    }
    if (mode === "expense" && isExpenseCategoryAtLimit) {
      addToast({
        title: "Limit reached",
        description: "You've reached the maximum number of expense categories.",
        color: "warning",
      });
      return;
    }
    setMode(mode);
    setEditedCategory(null);
    setIsOpen(true);
  };

  const handleEditCategory = (
    categoryId: string,
    mode: "income" | "expense" = "income",
  ) => {
    const categories = mode === "income" ? incomeCategories : expenseCategories;
    const category = categories.find((c) => c.id === categoryId);

    setMode(mode);
    setEditedCategory(category || null);
    setIsOpen(true);
  };

  const handleCategoryCancel = () => {
    setIsOpen(false);
    setEditedCategory(null);
  };

  const handleIncomeCategorySave = (name: string) => {
    if (editedCategory) {
      updateIncomeCategory(editedCategory.id, name);
    } else {
      addIncomeCategory(name);
    }

    setIsOpen(false);
    setEditedCategory(null);
  };

  const handleIncomeCategoryDelete = () => {
    if (editedCategory) {
      deleteIncomeCategory(editedCategory.id);
    }
    setIsOpen(false);
    setEditedCategory(null);
  };

  const incomeProps = {
    categories: incomeCategories,
    onSave: handleIncomeCategorySave,
    onDelete: handleIncomeCategoryDelete,
  };

  const handleExpenseCategorySave = (name: string) => {
    if (editedCategory) {
      updateExpenseCategory(editedCategory.id, name);
    } else {
      addExpenseCategory(name);
    }
    setIsOpen(false);
    setEditedCategory(null);
  };

  const handleExpenseCategoryDelete = () => {
    if (editedCategory) {
      deleteExpenseCategory(editedCategory.id);
    }
    setIsOpen(false);
    setEditedCategory(null);
  };

  const expenseProps = {
    categories: expenseCategories,
    onSave: handleExpenseCategorySave,
    onDelete: handleExpenseCategoryDelete,
  };

  const props = mode === "income" ? incomeProps : expenseProps;

  return (
    <CategoryDrawerContext
      value={{
        ...props,
        isOpen,
        category: editedCategory,
        onOpen: handleOpen,
        onCancel: handleCategoryCancel,
        onClose: handleCategoryCancel,
        onEditCategory: handleEditCategory,
      }}
    >
      {children}
    </CategoryDrawerContext>
  );
}
