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
    if (importedData) {
      // Extract input data (without IDs) for bulk add
      const incomeInputs = importedData.data.incomes.map((income) => ({
        name: income.name,
        amount: income.amount,
        frequency: income.frequency,
      }));

      const expenseInputs = importedData.data.expenses.map((expense) => ({
        name: expense.name,
        amount: expense.amount,
        frequency: expense.frequency,
      }));

      // Use bulk add operations for better performance
      addIncomes(incomeInputs);
      addExpenses(expenseInputs);
    }
  };

  return (
    <DataExportImportContext value={{ exportData, importData }}>
      {children}
    </DataExportImportContext>
  );
}
