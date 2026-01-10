import type { Item, Category } from "core/types";
import { restoreAllData, getAllData } from "db/backup";

interface BackupDataV1 {
  metadata: {
    version: string;
    exportedAt: string;
  };
  data: {
    incomes: Item[];
    expenses: Item[];
    incomeCategories: Category[];
    expenseCategories: Category[];
  };
}

export interface BackupData {
  metadata: {
    version: string;
    exportedAt: string;
  };
  data: {
    incomeItems: Item[];
    incomeCategories: Category[];
    expenseItems: Item[];
    expenseCategories: Category[];
  };
}

type AnyBackupData = BackupData | BackupDataV1;

interface BackupDataInput {
  incomeItems: Item[];
  expenseItems: Item[];
  incomeCategories: Category[];
  expenseCategories: Category[];
}

export async function backupData(): Promise<void> {
  const input = await getAllData();
  const data = createBackupData(input);
  downloadBackupData(data);
}

export function createBackupData({
  incomeItems,
  incomeCategories,
  expenseItems,
  expenseCategories,
}: BackupDataInput): BackupData {
  return {
    metadata: {
      version: "0.2.0",
      exportedAt: new Date().toISOString(),
    },
    data: {
      incomeItems,
      incomeCategories,
      expenseItems,
      expenseCategories,
    },
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

export async function restoreBackupToDb(backup: AnyBackupData): Promise<void> {
  const version = backup?.metadata?.version;
  let incomeItems: Item[] = [];
  let expenseItems: Item[] = [];
  let incomeCategories: Category[] = [];
  let expenseCategories: Category[] = [];

  if (version === "0.1.0") {
    const backupV1 = backup as BackupDataV1;
    incomeItems = backupV1.data?.incomes ?? [];
    expenseItems = backupV1.data?.expenses ?? [];
    incomeCategories = backupV1.data?.incomeCategories ?? [];
    expenseCategories = backupV1.data?.expenseCategories ?? [];
    console.warn("Restored backup from version 0.1.0.");
  } else {
    const backupV2 = backup as BackupData;
    incomeItems = backupV2.data?.incomeItems ?? [];
    expenseItems = backupV2.data?.expenseItems ?? [];
    incomeCategories = backupV2.data?.incomeCategories ?? [];
    expenseCategories = backupV2.data?.expenseCategories ?? [];
  }

  await restoreAllData({
    incomeItems,
    expenseItems,
    incomeCategories,
    expenseCategories,
  });
}
