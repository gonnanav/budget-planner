import { DataExportImportContext } from "@/contexts/DataExportImportContext";
import { IncomeContext } from "@/contexts/IncomeContext";
import { ExpenseContext } from "@/contexts/ExpenseContext";
import { exportBudgetData } from "@/lib/export";
import { useContext } from "react";

interface JsonExportImportProviderProps {
  children: React.ReactNode;
}

export function JsonExportImportProvider({
  children,
}: JsonExportImportProviderProps) {
  const { incomes } = useContext(IncomeContext);
  const { expenses } = useContext(ExpenseContext);
  const exportData = () => exportBudgetData(incomes, expenses);

  return (
    <DataExportImportContext value={{ exportData }}>
      {children}
    </DataExportImportContext>
  );
}
