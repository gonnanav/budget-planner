import type { BackupData, CategoryRecord, ItemRecord } from "@/domain/types";

type BackupDataInput = {
  incomeItems: ItemRecord[];
  expenseItems: ItemRecord[];
  incomeCategories: CategoryRecord[];
  expenseCategories: CategoryRecord[];
};

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
