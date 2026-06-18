import { db, type DbSetting } from "@/db";
import type { Table } from "dexie";
import type { BackupData, BackupSettings } from "../schemas";

export async function restoreData(backup: BackupData): Promise<void> {
  const { income, expenses, settings } = backup.data;
  
  await db.transaction("rw", db.tables, async () =>
    Promise.all([
      replaceAllInTable(db.income, income),
      replaceAllInTable(db.expenses, expenses),
      replaceAllInTable(db.settings, toDbSettings(settings)),
    ]),
  );
}

async function replaceAllInTable(table: Table, data: unknown[]): Promise<void> {
  await table.clear();
  await table.bulkAdd(data);
}

function toDbSettings(settings: BackupSettings): DbSetting[] {
  return [{ key: "currency", value: settings.currency }];
}
