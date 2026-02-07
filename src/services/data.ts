import { createBackupData } from "core/backup";
import type { BackupData } from "core/types";
import { restoreAllData, getAllData } from "db/backup";
import type { CategoryRecord, ItemRecord } from "db/types";

interface BackupDataV1 {
  metadata: {
    version: string;
    exportedAt: string;
  };
  data: {
    incomes: ItemRecord[];
    expenses: ItemRecord[];
    incomeCategories: CategoryRecord[];
    expenseCategories: CategoryRecord[];
  };
}

export async function backupData(): Promise<void> {
  const input = await getAllData();
  const data = createBackupData(input);
  downloadBackupData(data);
}

export async function restoreData(backup: BackupData): Promise<void> {
  const version = backup?.metadata?.version;
  let incomeItems: ItemRecord[] = [];
  let expenseItems: ItemRecord[] = [];
  let incomeCategories: CategoryRecord[] = [];
  let expenseCategories: CategoryRecord[] = [];

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
    incomeItems,
    expenseItems,
    incomeCategories,
    expenseCategories,
  });
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
