import { BudgetItem, Category } from "@/core/types";
import { EntityTable } from "dexie";

export type BudgetItemDb = BudgetItem;
export type CategoryDb = Category;

export type ItemsTable = EntityTable<BudgetItemDb, "id">;
export type CategoriesTable = EntityTable<CategoryDb, "id">;
