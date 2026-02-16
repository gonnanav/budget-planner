import { createContext } from "react";
import type {
  BackupData,
  Category,
  CategoryInput,
  Item,
  ItemInput,
  Section,
} from "domain/types";

type ItemService = {
  getItems: (section: Section) => Promise<Item[]>;
  addItem: (input: ItemInput) => Promise<string>;
  updateItem: (id: string, input: ItemInput) => Promise<boolean>;
  deleteItem: (id: string, section: Section) => Promise<void>;
};

type CategoryService = {
  getCategories: (section: Section) => Promise<Category[]>;
  addCategory: (input: CategoryInput) => Promise<string>;
  updateCategory: (id: string, input: CategoryInput) => Promise<boolean>;
  deleteCategory: (id: string, section: Section) => Promise<void>;
};

type BackupService = {
  backupData: () => Promise<void>;
  restoreData: (backup: BackupData) => Promise<void>;
};

type Services = {
  itemService: ItemService;
  categoryService: CategoryService;
  backupService: BackupService;
};

function notProvided(): never {
  throw new Error("ServicesContext not provided");
}

export const ServicesContext = createContext<Services>({
  itemService: {
    getItems: notProvided,
    addItem: notProvided,
    updateItem: notProvided,
    deleteItem: notProvided,
  },
  categoryService: {
    getCategories: notProvided,
    addCategory: notProvided,
    updateCategory: notProvided,
    deleteCategory: notProvided,
  },
  backupService: {
    backupData: notProvided,
    restoreData: notProvided,
  },
});
