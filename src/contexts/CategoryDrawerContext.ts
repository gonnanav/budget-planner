import { createContext } from "react";

export interface CategoryDrawerContextValue {
  onOpen: (mode: "income" | "expense") => void;
  onEditCategory: (id: string, mode: "income" | "expense") => void;
}

export const CategoryDrawerContext = createContext<CategoryDrawerContextValue>({
  onOpen: () => {},
  onEditCategory: () => {},
});
