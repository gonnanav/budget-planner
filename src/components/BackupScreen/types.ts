export type BackupItem = {
  id: string;
  name: string;
  amount: number | null;
  frequency: "monthly" | "biMonthly";
  categoryId: string | null;
  notes: string;
};

export type BackupCategory = {
  id: string;
  name: string;
};

export type BackupSection = {
  items: BackupItem[];
  categories: BackupCategory[];
};

export type BackupBudget = {
  income: BackupSection;
  expenses: BackupSection;
};

export type BackupData = {
  metadata: {
    version: number;
    exportedAt: string;
  };
  data: BackupBudget;
};
