import type { BudgetEntry } from "@/core/types";

interface ExportData {
  metadata: {
    version: string;
    exportedAt: string;
  };
  data: {
    expenses: BudgetEntry[];
    incomes: BudgetEntry[];
  };
}

export function exportBudgetData(
  incomes: BudgetEntry[],
  expenses: BudgetEntry[],
) {
  const data = createExportData(expenses, incomes);
  downloadExportData(data);
}

export function createExportData(
  incomes: BudgetEntry[],
  expenses: BudgetEntry[],
): ExportData {
  return {
    metadata: {
      version: "0.1.0",
      exportedAt: new Date().toISOString(),
    },
    data: {
      incomes,
      expenses,
    },
  };
}

function downloadExportData(data: ExportData): void {
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
