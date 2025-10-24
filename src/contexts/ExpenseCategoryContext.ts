import { createContext } from "react";
import { Category } from "@/core/types";

interface ExpenseCategoryContextValue {
  expenseCategories: Category[];
  addExpenseCategory: (name: string) => void;
  updateExpenseCategory: (id: string, name: string) => void;
  deleteExpenseCategory: (id: string) => void;
  addExpenseCategories: (categories: Category[]) => void;
  isExpenseCategoryAtLimit: boolean;
}

export const ExpenseCategoryContext =
  createContext<ExpenseCategoryContextValue>({
    expenseCategories: [],
    addExpenseCategory: () => {},
    updateExpenseCategory: () => {},
    deleteExpenseCategory: () => {},
    addExpenseCategories: () => {},
    isExpenseCategoryAtLimit: false,
  });
