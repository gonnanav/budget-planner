import Dexie from "dexie";
import type { EntityTable } from "dexie";
import type { Item, Category } from "@/domain/types";

export type ItemRecord = Omit<Item, "normalizedAmount" | "section">;
export type CategoryRecord = Omit<Category, "section">;

export type ItemsTable = EntityTable<ItemRecord, "id">;
export type CategoriesTable = EntityTable<CategoryRecord, "id">;

const db = new Dexie("BudgetDatabase") as Dexie & {
  incomeItems: ItemsTable;
  expenseItems: ItemsTable;
  incomeCategories: CategoriesTable;
  expenseCategories: CategoriesTable;
};

db.version(5)
  .stores({
    incomeItems: "id, categoryId",
    expenseItems: "id, categoryId",
    incomeCategories: "id",
    expenseCategories: "id",
    incomes: null,
    expenses: null,
  })
  .upgrade(async (tx) => {
    const copyItems = async (fromTable: string, toTable: string) => {
      const items = await tx.table(fromTable).toArray();
      await tx.table(toTable).bulkAdd(items);
    };

    await Promise.all([
      copyItems("incomes", "incomeItems"),
      copyItems("expenses", "expenseItems"),
    ]);
  });

export { db };
