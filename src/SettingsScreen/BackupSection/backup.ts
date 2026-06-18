import { DEFAULT_CURRENCY } from "@/currency";
import { db, type DbItem, type DbSetting } from "@/db";
import type { BackupBudget, BackupData, BackupSettings } from "../schemas";

type DbData = {
  income: DbItem[];
  expenses: DbItem[];
  settings: DbSetting[];
};

export async function backupData(): Promise<void> {
  const dbData = await getDbData();
  const backup = createBackupData(dbData);
  downloadBackupData(backup);
}

function createBackupData(dbData: DbData): BackupData {
  return {
    metadata: {
      version: 1,
      exportedAt: new Date().toISOString(),
    },
    data: toBackupBudget(dbData),
  };
}

async function getDbData(): Promise<DbData> {
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

function toBackupBudget({ income, expenses, settings }: DbData): BackupBudget {
  return {
    income,
    expenses,
    settings: toBackupSettings(settings),
  };
}

function toBackupSettings(settings: DbSetting[]): BackupSettings {
  if (settings.length === 0) {
    return { currency: DEFAULT_CURRENCY };
  }

  return { currency: settings[0].value };
}
