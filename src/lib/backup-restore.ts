import type { BudgetItem, Category } from "@/core/types";
import { db } from "@/lib/db";

export interface BackupData {
  metadata: {
    version: string;
    exportedAt: string;
  };
  data: {
    expenses: BudgetItem[];
    incomes: BudgetItem[];
    incomeCategories: Category[];
    expenseCategories: Category[];
  };
}

interface BackupDataInput {
  incomes: BudgetItem[];
  expenses: BudgetItem[];
  incomeCategories: Category[];
  expenseCategories: Category[];
}

export function triggerBackupDownload(input: BackupDataInput) {
  const data = createBackupData(input);
  downloadBackupData(data);
}

export function createBackupData({
  incomes,
  expenses,
  incomeCategories,
  expenseCategories,
}: BackupDataInput): BackupData {
  return {
    metadata: {
      version: "0.1.0",
      exportedAt: new Date().toISOString(),
    },
    data: {
      incomes,
      expenses,
      incomeCategories,
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
  const incomes = data?.incomes ?? [];
  const expenses = data?.expenses ?? [];
  const incomeCategories = data?.incomeCategories ?? [];
  const expenseCategories = data?.expenseCategories ?? [];

  await db.transaction(
    "rw",
    db.incomeCategories,
    db.expenseCategories,
    db.incomes,
    db.expenses,
    async () => {
      await db.incomes.clear();
      await db.expenses.clear();
      await db.incomeCategories.clear();
      await db.expenseCategories.clear();

      await db.incomeCategories.bulkAdd(incomeCategories);
      await db.expenseCategories.bulkAdd(expenseCategories);
      await db.incomes.bulkAdd(incomes);
      await db.expenses.bulkAdd(expenses);
    },
  );
}
