import { createBackupData } from "@/domain/backup";
import type { BackupData } from "@/domain/types";
import { db, type DbCategory } from "@/db";
import type { ItemRecord } from "@/domain/types";
import type { Table } from "dexie";

export type BackupItem = {
  id: string;
  name: string;
  amount: number | null;
  frequency: "monthly" | "biMonthly";
  categoryId: string | null;
  notes?: string;
};

export type BackupCategory = {
  id: string;
  name: string;
};

type DbData = {
  incomeItems: ItemRecord[];
  incomeCategories: DbCategory[];
  expenseItems: ItemRecord[];
  expenseCategories: DbCategory[];
};

type BackupDataV1 = {
  metadata: {
    version: string;
    exportedAt: string;
  };
  data: {
    incomes: BackupItem[];
    expenses: BackupItem[];
    incomeCategories: BackupCategory[];
    expenseCategories: BackupCategory[];
  };
};

export async function backupData(): Promise<void> {
  const input = await getAllData();
  const data = createBackupData(input);
  downloadBackupData(data);
}

export async function restoreData(backup: BackupData): Promise<void> {
  const version = backup?.metadata?.version;
  let incomeItems: BackupItem[] = [];
  let expenseItems: BackupItem[] = [];
  let incomeCategories: BackupCategory[] = [];
  let expenseCategories: BackupCategory[] = [];

  if (version === "0.1.0") {
    const backupV1 = backup as unknown as BackupDataV1;
    incomeItems = backupV1.data?.incomes ?? [];
    expenseItems = backupV1.data?.expenses ?? [];
    incomeCategories = backupV1.data?.incomeCategories ?? [];
    expenseCategories = backupV1.data?.expenseCategories ?? [];
    console.warn("Restored backup from version 0.1.0.");
  } else {
    incomeItems = backup.data?.incomeItems ?? [];
    expenseItems = backup.data?.expenseItems ?? [];
    incomeCategories = backup.data?.incomeCategories ?? [];
    expenseCategories = backup.data?.expenseCategories ?? [];
  }

  await restoreAllData({
    incomeItems: incomeItems.map(toItemRecord),
    expenseItems: expenseItems.map(toItemRecord),
    incomeCategories,
    expenseCategories,
  });
}

async function getAllData(): Promise<DbData> {
  const [incomeItems, incomeCategories, expenseItems, expenseCategories] = await Promise.all([
    db.incomeItems.toArray(),
    db.incomeCategories.toArray(),
    db.expenseItems.toArray(),
    db.expenseCategories.toArray(),
  ]);

  return {
    incomeItems: incomeItems.map(toItemRecord),
    incomeCategories,
    expenseItems: expenseItems.map(toItemRecord),
    expenseCategories,
  };
}

function toItemRecord(item: BackupItem): ItemRecord {
  return {
    id: item.id,
    name: item.name,
    amount: item.amount,
    frequency: item.frequency,
    categoryId: item.categoryId,
    notes: item.notes ?? "",
  };
}

async function restoreAllData({
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
