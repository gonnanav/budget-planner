import { db } from "@/db";
import type { Table } from "dexie";
import type { BackupData } from "../schemas";

export async function restoreData(backup: BackupData): Promise<void> {
  const { income, expenses } = backup.data;
  await db.transaction("rw", db.tables, async () =>
    Promise.all([
      replaceAllInTable(db.income, income),
      replaceAllInTable(db.expenses, expenses),
    ]),
  );
}

async function replaceAllInTable(table: Table, data: unknown[]): Promise<void> {
  await table.clear();
  await table.bulkAdd(data);
}
