import type { Category, Item } from "core/types";
import type { EntityTable } from "dexie";

export type ItemRecord = Omit<Item, "normalizedAmount" | "section">;
export type CategoryRecord = Omit<Category, "section">;

export type ItemsTable = EntityTable<ItemRecord, "id">;
export type CategoriesTable = EntityTable<CategoryRecord, "id">;
