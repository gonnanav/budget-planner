import { db, type DbItem, type DbCategory } from "@/db";
import type { Table } from "dexie";

export type BackupData = {
  metadata: {
    version: number;
    exportedAt: string;
  };
  data: BackupBudget;
};

type BackupItem = {
  id: string;
  name: string;
  amount: number | null;
  frequency: "monthly" | "biMonthly";
  categoryId: string | null;
  notes: string;
};

type BackupCategory = {
  id: string;
  name: string;
};

type BackupSection = {
  items: BackupItem[];
  categories: BackupCategory[];
};

type BackupBudget = {
  income: BackupSection;
  expenses: BackupSection;
};

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

async function replaceAllInTable(table: Table, data: unknown[]): Promise<void> {
  await table.clear();
  await table.bulkAdd(data);
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
