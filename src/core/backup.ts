import type { BackupData, Category, Item } from "core/types";

interface BackupDataInput {
  incomeItems: Omit<Item, "normalizedAmount" | "section">[];
  expenseItems: Omit<Item, "normalizedAmount" | "section">[];
  incomeCategories: Omit<Category, "section">[];
  expenseCategories: Omit<Category, "section">[];
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
