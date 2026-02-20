import { createContext } from "react";
import type {
  BackupData,
  Budget,
  CategoryInput,
  ItemInput,
  Section,
} from "domain/types";

type BudgetService = {
  getBudget: () => Promise<Budget>;
  addItem: (input: ItemInput) => Promise<string>;
  updateItem: (id: string, input: ItemInput) => Promise<boolean>;
  deleteItem: (id: string, section: Section) => Promise<void>;
  addCategory: (input: CategoryInput) => Promise<string>;
  updateCategory: (id: string, input: CategoryInput) => Promise<boolean>;
  deleteCategory: (id: string, section: Section) => Promise<void>;
};

type BackupService = {
  backupData: () => Promise<void>;
  restoreData: (backup: BackupData) => Promise<void>;
};

type Services = {
  budgetService: BudgetService;
  backupService: BackupService;
};

function notProvided(): never {
  throw new Error("ServicesContext not provided");
}

export const ServicesContext = createContext<Services>({
  budgetService: {
    getBudget: notProvided,
    addItem: notProvided,
    updateItem: notProvided,
    deleteItem: notProvided,
    addCategory: notProvided,
    updateCategory: notProvided,
    deleteCategory: notProvided,
  },
  backupService: {
    backupData: notProvided,
    restoreData: notProvided,
  },
});
