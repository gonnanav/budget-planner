import { createContext } from "react";
import { BudgetItem, BudgetItemInput } from "@/core/types";
import { Category } from "@/core/types";

interface ItemDrawerContextValue {
  isOpen: boolean;
  editedItem: BudgetItem | null;
  categories: Category[];
  onEditItem: (id: string, mode: "income" | "expense") => void;
  onOpen: (mode: "income" | "expense") => void;
  onClose: () => void;
  onSave: (input: BudgetItemInput) => void;
  onDelete: () => void;
  onCancel: () => void;
}

export const ItemDrawerContext = createContext<ItemDrawerContextValue>({
  isOpen: false,
  editedItem: null,
  categories: [],
  onEditItem: () => {},
  onOpen: () => {},
  onClose: () => {},
  onSave: () => {},
  onDelete: () => {},
  onCancel: () => {},
});
