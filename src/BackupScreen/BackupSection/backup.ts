import { db, type DbItem, type DbCategory } from "@/db";
import type { BackupData } from "../schemas";

type DbSection = {
  items: DbItem[];
  categories: DbCategory[];
};

type DbData = {
  income: DbSection;
  expenses: DbSection;
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
  const [incomeItems, incomeCategories, expenseItems, expenseCategories] = await Promise.all([
    db.incomeItems.toArray(),
    db.incomeCategories.toArray(),
    db.expenseItems.toArray(),
    db.expenseCategories.toArray(),
  ]);

  return {
    income: { items: incomeItems, categories: incomeCategories },
    expenses: { items: expenseItems, categories: expenseCategories },
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
