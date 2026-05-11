import { db } from "@/db";
import type { Table } from "dexie";
import type { BackupData } from "../types";

export async function restoreData(backup: BackupData): Promise<void> {
  const { income, expenses } = backup.data;
  await db.transaction("rw", db.tables, async () =>
    Promise.all([
      replaceAllInTable(db.incomeItems, income.items),
      replaceAllInTable(db.incomeCategories, income.categories),
      replaceAllInTable(db.expenseItems, expenses.items),
      replaceAllInTable(db.expenseCategories, expenses.categories),
    ]),
  );
}

async function replaceAllInTable(table: Table, data: unknown[]): Promise<void> {
  await table.clear();
  await table.bulkAdd(data);
}
