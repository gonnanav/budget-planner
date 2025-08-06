import { db } from "@/db";
import type { Table } from "dexie";
import type { BackupData } from "../schemas";

export type BackupSummary = {
  version: number;
  exportedAt: string;
  incomeItemsCount: number;
  expenseItemsCount: number;
  incomeCategoriesCount: number;
  expenseCategoriesCount: number;
};

export function createBackupSummary(data: BackupData): BackupSummary {
  return {
    version: data.metadata.version,
    exportedAt: data.metadata.exportedAt,
    incomeItemsCount: data.data.income.items.length,
    expenseItemsCount: data.data.expenses.items.length,
    incomeCategoriesCount: data.data.income.categories.length,
    expenseCategoriesCount: data.data.expenses.categories.length,
  };
}

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
