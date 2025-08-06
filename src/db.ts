import Dexie, { type EntityTable } from "dexie";

export type DbItem = {
  id: string;
  name: string;
  amount: number | null;
  frequency: "monthly" | "biMonthly";
  categoryId: string | null;
  notes: string;
};

export type DbCategory = {
  id: string;
  name: string;
};

export type ItemsTable = EntityTable<DbItem, "id">;
export type CategoriesTable = EntityTable<DbCategory, "id">;

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

db.version(6).upgrade((tx) => {
  const normalize = (table: string) =>
    tx.table(table).toCollection().modify((item) => {
      if (item.categoryId === undefined) {
        item.categoryId = null;
      }
    });

  return Promise.all([normalize("incomeItems"), normalize("expenseItems")]);
});

db.version(7).upgrade((tx) => {
  const normalize = (table: string) =>
    tx.table(table).toCollection().modify((item) => {
      if (item.notes === undefined) {
        item.notes = "";
      }
    });

  return Promise.all([normalize("incomeItems"), normalize("expenseItems")]);
});

export { db };
