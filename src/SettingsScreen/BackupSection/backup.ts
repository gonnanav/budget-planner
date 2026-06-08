import { db, type DbItem } from "@/db";
import type { BackupData } from "../schemas";

type DbData = {
  income: DbItem[];
  expenses: DbItem[];
};

export async function backupData(): Promise<void> {
  const dbData = await getDbData();
  const backup = createBackupData(dbData);
  downloadBackupData(backup);
}

function createBackupData(data: DbData): BackupData {
  return {
    metadata: {
      version: 1,
      exportedAt: new Date().toISOString(),
    },
    data,
  };
}

async function getDbData(): Promise<DbData> {
  const [incomeItems, expenseItems] = await Promise.all([
    db.income.toArray(),
    db.expenses.toArray(),
  ]);

  return {
    income: incomeItems,
    expenses: expenseItems,
  };
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
