import { useContext } from "react";
import { DataExportImportContext } from "@/contexts/DataExportImportContext";
import { IncomeContext } from "@/contexts/IncomeContext";
import { ExpenseContext } from "@/contexts/ExpenseContext";
import { IncomeCategoryContext } from "@/contexts/IncomeCategoryContext";
import { ExpenseCategoryContext } from "@/contexts/ExpenseCategoryContext";
import { exportBudgetData, importBudgetData } from "@/lib/export-import";

interface JsonExportImportProviderProps {
  children: React.ReactNode;
}

export function JsonExportImportProvider({
  children,
}: JsonExportImportProviderProps) {
  const { incomes, addIncomes } = useContext(IncomeContext);
  const { expenses, addExpenses } = useContext(ExpenseContext);
  const { incomeCategories, addIncomeCategories } = useContext(
    IncomeCategoryContext,
  );
  const { expenseCategories, addExpenseCategories } = useContext(
    ExpenseCategoryContext,
  );

  const exportData = () =>
    exportBudgetData({
      incomes,
      expenses,
      incomeCategories,
      expenseCategories,
    });

  const importData = async () => {
    const importedData = await importBudgetData();
    if (!importedData) return;

    addIncomes(importedData.data.incomes);
    addExpenses(importedData.data.expenses);
    addIncomeCategories(importedData.data.incomeCategories);
    addExpenseCategories(importedData.data.expenseCategories);
  };

  return (
    <DataExportImportContext value={{ exportData, importData }}>
      {children}
    </DataExportImportContext>
  );
}
