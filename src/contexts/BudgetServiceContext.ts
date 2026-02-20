import { createContext } from "react";
import type {
  Budget,
  CategoryInput,
  ItemInput,
  Section,
} from "domain/types";

export type BudgetService = {
  getBudget: () => Promise<Budget>;
  addItem: (input: ItemInput) => Promise<string>;
  updateItem: (id: string, input: ItemInput) => Promise<boolean>;
  deleteItem: (id: string, section: Section) => Promise<void>;
  addCategory: (input: CategoryInput) => Promise<string>;
  updateCategory: (id: string, input: CategoryInput) => Promise<boolean>;
  deleteCategory: (id: string, section: Section) => Promise<void>;
};

function notProvided(): never {
  throw new Error("BudgetServiceContext not provided");
}

export const BudgetServiceContext = createContext<BudgetService>({
  getBudget: notProvided,
  addItem: notProvided,
  updateItem: notProvided,
  deleteItem: notProvided,
  addCategory: notProvided,
  updateCategory: notProvided,
  deleteCategory: notProvided,
});
