import { createContext } from "react";
import { Category } from "@/core/types";

interface IncomeCategoryContextValue {
  incomeCategories: Category[];
  addIncomeCategory: (name: string) => void;
  updateIncomeCategory: (id: string, name: string) => void;
  deleteIncomeCategory: (id: string) => void;
  addIncomeCategories: (categories: Category[]) => void;
}

export const IncomeCategoryContext = createContext<IncomeCategoryContextValue>({
  incomeCategories: [],
  addIncomeCategory: () => {},
  updateIncomeCategory: () => {},
  deleteIncomeCategory: () => {},
  addIncomeCategories: () => {},
});
