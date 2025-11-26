import { Item, Category } from "@/core/types";
import { EntityTable } from "dexie";

export type DbItem = Item;
export type DbCategory = Category;

export type ItemsTable = EntityTable<DbItem, "id">;
export type CategoriesTable = EntityTable<DbCategory, "id">;
