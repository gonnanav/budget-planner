import type { BudgetEntry } from "@/core/types";

export interface ExportImportData {
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
  const data = createExportData(incomes, expenses);
  downloadExportData(data);
}

export function createExportData(
  incomes: BudgetEntry[],
  expenses: BudgetEntry[],
): ExportImportData {
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

function downloadExportData(data: ExportImportData): void {
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

export function importBudgetData(): Promise<ExportImportData | null> {
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
          const data = JSON.parse(content) as ExportImportData;

          resolve(data);
        } catch (error) {
          console.error("Failed to parse imported file:", error);
          resolve(null);
        }
      };

      reader.readAsText(file);
    };

    input.click();
  });
}
