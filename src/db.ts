import Dexie from "dexie";
import type { EntityTable } from "dexie";

export type ItemRecord = {
  id: string;
  name: string;
  amount: number | null;
  frequency: "monthly" | "biMonthly";
  categoryId: string | null;
  notes?: string;
};

export type CategoryRecord = {
  id: string;
  name: string;
};

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
