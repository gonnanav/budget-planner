import { createContext } from "react";
import { Category } from "@/core/types";

export interface CategoryDrawerContextValue {
  isOpen: boolean;
  category: Category | null;
  categories: Category[];
  onEditCategory: (id: string, mode: "income" | "expense") => void;
  onOpen: (mode: "income" | "expense") => void;
  onClose: () => void;
  onSave: (name: string) => void;
  onDelete: () => void;
  onCancel: () => void;
}

export const CategoryDrawerContext = createContext<CategoryDrawerContextValue>({
  isOpen: false,
  category: null,
  categories: [],
  onEditCategory: () => {},
  onOpen: () => {},
  onClose: () => {},
  onSave: () => {},
  onDelete: () => {},
  onCancel: () => {},
});
