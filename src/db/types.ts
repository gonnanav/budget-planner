import type { Category, Item } from "core/types";
import { EntityTable } from "dexie";

export type ItemRecord = Omit<Item, "normalizedAmount" | "section">;
export type CategoryRecord = Omit<Category, "section">;

export type ItemsTable = EntityTable<ItemRecord, "id">;
export type CategoriesTable = EntityTable<CategoryRecord, "id">;

export type ItemApi = {
  getItems: () => Promise<Item[]>;
  addItem: (item: Item) => Promise<string>;
  updateItem: (item: Item) => Promise<boolean>;
  deleteItem: (id: string) => Promise<void>;
};

export type CategoryApi = {
  getCategories: () => Promise<Category[]>;
  addCategory: (category: Category) => Promise<string>;
  updateCategory: (category: Category) => Promise<boolean>;
  deleteCategory: (id: string) => Promise<void>;
};
