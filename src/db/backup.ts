import { Table } from "dexie";
import { db } from "./db";
import { ItemRecord, CategoryRecord } from "./types";

interface DbData {
  incomeItems: ItemRecord[];
  incomeCategories: CategoryRecord[];
  expenseItems: ItemRecord[];
  expenseCategories: CategoryRecord[];
}

export async function restoreAllData({
  incomeItems,
  incomeCategories,
  expenseItems,
  expenseCategories,
}: DbData): Promise<void> {
  await db.transaction("rw", db.tables, async () =>
    Promise.all([
      replaceAllInTable(db.incomeItems, incomeItems),
      replaceAllInTable(db.incomeCategories, incomeCategories),
      replaceAllInTable(db.expenseItems, expenseItems),
      replaceAllInTable(db.expenseCategories, expenseCategories),
    ]),
  );
}

async function replaceAllInTable(table: Table, data: unknown[]): Promise<void> {
  await table.clear();
  await table.bulkAdd(data);
}

export async function getAllData(): Promise<DbData> {
  const [incomeItems, incomeCategories, expenseItems, expenseCategories] =
    await Promise.all([
      db.incomeItems.toArray(),
      db.incomeCategories.toArray(),
      db.expenseItems.toArray(),
      db.expenseCategories.toArray(),
    ]);

  return {
    incomeItems,
    incomeCategories,
    expenseItems,
    expenseCategories,
  };
}
