import type { BudgetItem, Category } from "@/core/types";
import { replaceAll, getAllData } from "@/db";

export interface BackupData {
  metadata: {
    version: string;
    exportedAt: string;
  };
  data: {
    incomeItems: BudgetItem[];
    incomeCategories: Category[];
    expenseItems: BudgetItem[];
    expenseCategories: Category[];
  };
}

interface BackupDataInput {
  incomeItems: BudgetItem[];
  expenseItems: BudgetItem[];
  incomeCategories: Category[];
  expenseCategories: Category[];
}

export async function backupData(): Promise<void> {
  const input = await getAllData();
  const data = createBackupData(input);
  downloadBackupData(data);
}

export async function restoreData(): Promise<void> {
  const backup = await pickBackupFile();
  if (!backup) return;

  await restoreBackupToDb(backup);
}

export function createBackupData({
  incomeItems,
  incomeCategories,
  expenseItems,
  expenseCategories,
}: BackupDataInput): BackupData {
  return {
    metadata: {
      version: "0.1.0",
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

export function pickBackupFile(): Promise<BackupData | null> {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];

      if (!file) {
        resolve(null);
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const data = JSON.parse(content) as BackupData;

          resolve(data);
        } catch (error) {
          console.error("Failed to parse backup file:", error);
          resolve(null);
        }
      };

      reader.readAsText(file);
    };

    input.click();
  });
}

export async function restoreBackupToDb(backup: BackupData): Promise<void> {
  const { data } = backup ?? {};
  const incomeItems = data?.incomeItems ?? [];
  const expenseItems = data?.expenseItems ?? [];
  const incomeCategories = data?.incomeCategories ?? [];
  const expenseCategories = data?.expenseCategories ?? [];

  await replaceAll({
    incomeItems,
    expenseItems,
    incomeCategories,
    expenseCategories,
  });
}
