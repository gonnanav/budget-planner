import { useContext } from "react";
import { DataBackupRestoreContext } from "@/contexts/DataBackupRestoreContext";
import { IncomeContext } from "@/contexts/IncomeContext";
import { ExpenseContext } from "@/contexts/ExpenseContext";
import { IncomeCategoryContext } from "@/contexts/IncomeCategoryContext";
import { ExpenseCategoryContext } from "@/contexts/ExpenseCategoryContext";
import {
  triggerBackupDownload,
  pickBackupFile,
  restoreBackupToDb,
} from "@/lib/backup-restore";

interface JsonBackupRestoreProviderProps {
  children: React.ReactNode;
}

export function JsonBackupRestoreProvider({
  children,
}: JsonBackupRestoreProviderProps) {
  const { incomes } = useContext(IncomeContext);
  const { expenses } = useContext(ExpenseContext);
  const { incomeCategories } = useContext(IncomeCategoryContext);
  const { expenseCategories } = useContext(ExpenseCategoryContext);

  const backupData = () =>
    triggerBackupDownload({
      incomes,
      expenses,
      incomeCategories,
      expenseCategories,
    });

  const restoreData = async () => {
    const backup = await pickBackupFile();
    if (!backup) return;

    await restoreBackupToDb(backup);
  };

  return (
    <DataBackupRestoreContext value={{ backupData, restoreData }}>
      {children}
    </DataBackupRestoreContext>
  );
}
