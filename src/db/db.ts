import Dexie from "dexie";
import { ItemsTable, CategoriesTable } from "./types";

const db = new Dexie("BudgetDatabase") as Dexie & {
  incomeItems: ItemsTable;
  expenseItems: ItemsTable;
  incomeCategories: CategoriesTable;
  expenseCategories: CategoriesTable;
};

db.version(4).stores({
  incomes: "id, categoryId",
  expenses: "id, categoryId",
  incomeCategories: "id",
  expenseCategories: "id",
});

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
