import { BudgetServiceContext } from "contexts/BudgetServiceContext";
import { BackupServiceContext } from "contexts/BackupServiceContext";
import {
  getBudget,
  addItem,
  updateItem,
  deleteItem,
  addCategory,
  updateCategory,
  deleteCategory,
} from "services/budget";
import { backupData, restoreData } from "services/backup";

interface ServiceProvidersProps {
  children: React.ReactNode;
}

const budgetService = {
  getBudget,
  addItem,
  updateItem,
  deleteItem,
  addCategory,
  updateCategory,
  deleteCategory,
};

const backupService = { backupData, restoreData };

export function ServiceProviders({ children }: Readonly<ServiceProvidersProps>) {
  return (
    <BudgetServiceContext value={budgetService}>
      <BackupServiceContext value={backupService}>
        {children}
      </BackupServiceContext>
    </BudgetServiceContext>
  );
}
