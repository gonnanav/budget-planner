import { createContext } from "react";
import { Category } from "@/core/types";

type EnrichedCategory = Category & { amount: number };

export interface IncomeCategoryContextValue {
  incomeCategories: EnrichedCategory[];
  addIncomeCategory: (name: string) => void;
  updateIncomeCategory: (id: string, name: string) => void;
  deleteIncomeCategory: (id: string) => void;
  addIncomeCategories: (categories: Category[]) => void;
  isIncomeCategoryAtLimit: boolean;
}

export const IncomeCategoryContext = createContext<IncomeCategoryContextValue>({
  incomeCategories: [],
  addIncomeCategory: () => {},
  updateIncomeCategory: () => {},
  deleteIncomeCategory: () => {},
  addIncomeCategories: () => {},
  isIncomeCategoryAtLimit: false,
});
