import { DEFAULT_CURRENCY } from "@/currency";
import { db, type DbItem, type DbSetting } from "@/db";
import type { Table } from "dexie";
import type {
  BackupBudget,
  BackupData,
  BackupItem,
  BackupSettings,
  DbBudget,
} from "./types";

export async function backupData(): Promise<void> {
  const dbData = await getDbBudget();
  const backup = createBackupData(dbData);
  downloadBackupData(backup);
}

export async function restoreData(backup: BackupData): Promise<void> {
  const { income, expenses, settings } = backup.data;

  await db.transaction("rw", db.tables, async () =>
    Promise.all([
      replaceAllInTable(db.income, income.map(toDbItem)),
      replaceAllInTable(db.expenses, expenses.map(toDbItem)),
      replaceAllInTable(db.settings, toDbSettings(settings)),
    ]),
  );
}

function createBackupData(dbData: DbBudget): BackupData {
  return {
    metadata: {
      version: 1,
      exportedAt: new Date().toISOString(),
    },
    data: fromDbBudget(dbData),
  };
}

async function getDbBudget(): Promise<DbBudget> {
  const [income, expenses, settings] = await Promise.all([
    db.income.toArray(),
    db.expenses.toArray(),
    db.settings.toArray(),
  ]);

  return { income, expenses, settings };
}

function downloadBackupData(data: BackupData): void {
  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, "-")
    .replace("T", "_")
    .slice(0, 19);

  const filename = `budget_v${data.metadata.version}_${timestamp}.json`;
  downloadJSON(data, filename);
}

function downloadJSON<T>(data: T, filename: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  downloadFile(blob, filename);
}

function downloadFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

async function replaceAllInTable(table: Table, data: unknown[]): Promise<void> {
  await table.clear();
  await table.bulkAdd(data);
}

function fromDbBudget({ income, expenses, settings }: DbBudget): BackupBudget {
  return {
    income: income.map(fromDbItem),
    expenses: expenses.map(fromDbItem),
    settings: fromDbSettings(settings),
  };
}

function fromDbItem({ name, amount, frequency, category, notes }: DbItem): BackupItem {
  return { name, amount, frequency, category, notes };
}

function fromDbSettings(settings: DbSetting[]): BackupSettings {
  if (settings.length === 0) {
    return { currency: DEFAULT_CURRENCY };
  }

  return { currency: settings[0].value };
}

function toDbItem(item: BackupItem): DbItem {
  return { id: crypto.randomUUID(), ...item };
}

function toDbSettings(settings: BackupSettings): DbSetting[] {
  return [{ key: "currency", value: settings.currency }];
}
