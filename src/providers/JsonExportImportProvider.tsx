import { DataExportImportContext } from "@/contexts/DataExportImportContext";
import { IncomeContext } from "@/contexts/IncomeContext";
import { ExpenseContext } from "@/contexts/ExpenseContext";
import { exportBudgetData, importBudgetData } from "@/lib/export-import";
import { useContext } from "react";

interface JsonExportImportProviderProps {
  children: React.ReactNode;
}

export function JsonExportImportProvider({
  children,
}: JsonExportImportProviderProps) {
  const { incomes, addIncomes } = useContext(IncomeContext);
  const { expenses, addExpenses } = useContext(ExpenseContext);

  const exportData = () => exportBudgetData(incomes, expenses);

  const importData = async () => {
    const importedData = await importBudgetData();
    if (!importedData) return;

    addIncomes(importedData.data.incomes);
    addExpenses(importedData.data.expenses);
  };

  return (
    <DataExportImportContext value={{ exportData, importData }}>
      {children}
    </DataExportImportContext>
  );
}
