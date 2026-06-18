import Dexie, { type EntityTable } from "dexie";

export type DbItem = {
  id: string;
  name: string;
  amount: number | null;
  frequency: "monthly" | "biMonthly";
  category: string;
  notes: string;
};

export type DbSetting = {
  key: "currency";
  value: string;
};

export type ItemsTable = EntityTable<DbItem, "id">;
export type SettingsTable = EntityTable<DbSetting, "key">;

const db = new Dexie("BudgetDatabase") as Dexie & {
  income: ItemsTable;
  expenses: ItemsTable;
  settings: SettingsTable;
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

db.version(8)
  .stores({
    income: "id, category",
    expenses: "id, category",
    incomeItems: null,
    expenseItems: null,
    incomeCategories: null,
    expenseCategories: null,
  })
  .upgrade(async (tx) => {
    type OldCategory = { id: string; name: string };
    type OldItem = { id: string; name: string; amount: number | null; frequency: string; categoryId: string | null; notes: string };

    const migrate = async (oldItemsTable: string, oldCategoriesTable: string, newTable: string) => {
      const categories: OldCategory[] = await tx.table(oldCategoriesTable).toArray();
      const categoryById = new Map(categories.map((c) => [c.id, c.name]));
      const items: OldItem[] = await tx.table(oldItemsTable).toArray();

      await tx.table(newTable).bulkAdd(
        items.map((item) => {
          let category = "";
          if (item.categoryId !== null) {
            category = categoryById.get(item.categoryId) ?? "";
          }

          return {
            id: item.id,
            name: item.name,
            amount: item.amount,
            frequency: item.frequency,
            category,
            notes: item.notes,
          };
        }),
      );
    };

    await Promise.all([
      migrate("incomeItems", "incomeCategories", "income"),
      migrate("expenseItems", "expenseCategories", "expenses"),
    ]);
  });

db.version(9).stores({
  settings: "key",
});

export { db };
