import { createContext } from "react";
import type { Category, CategoryInput, Section } from "domain/types";

interface CategoryService {
  getCategories: (section: Section) => Promise<Category[]>;
  addCategory: (input: CategoryInput) => Promise<string>;
  updateCategory: (id: string, input: CategoryInput) => Promise<boolean>;
  deleteCategory: (id: string, section: Section) => Promise<void>;
}

function notProvided(): never {
  throw new Error("CategoryServiceContext not provided");
}

export const CategoryServiceContext = createContext<CategoryService>({
  getCategories: notProvided,
  addCategory: notProvided,
  updateCategory: notProvided,
  deleteCategory: notProvided,
});
