import { BudgetItem, Category } from "@/core/types";
import { EntityTable } from "dexie";

export type DbBudgetItem = BudgetItem;
export type DbCategory = Category;

export type ItemsTable = EntityTable<DbBudgetItem, "id">;
export type CategoriesTable = EntityTable<DbCategory, "id">;
