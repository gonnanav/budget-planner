"use client";

import { ToastProvider } from "@heroui/toast";
import { AppHeroUIProvider } from "./AppHeroUIProvider";
import { PathnameProvider } from "./PathnameProvider";
import { JsonBackupRestoreProvider } from "./JsonBackupRestoreProvider";
import { IncomeContext, IncomeContextValue } from "@/contexts/IncomeContext";
import { ExpenseContext, ExpenseContextValue } from "@/contexts/ExpenseContext";
import {
  AppActionsContext,
  AppActionsContextValue,
} from "@/contexts/AppActionsContext";

interface ProvidersProps {
  incomes: IncomeContextValue;
  expenses: ExpenseContextValue;
  appActions: AppActionsContextValue;
  children: React.ReactNode;
}

export function Providers({
  incomes,
  expenses,
  appActions,
  children,
}: Readonly<ProvidersProps>) {
  return (
    <AppHeroUIProvider>
      <IncomeContext value={incomes}>
        <ExpenseContext value={expenses}>
          <AppActionsContext value={appActions}>
            <PathnameProvider>
              <JsonBackupRestoreProvider>{children}</JsonBackupRestoreProvider>
            </PathnameProvider>
          </AppActionsContext>
        </ExpenseContext>
      </IncomeContext>
      <ToastProvider />
    </AppHeroUIProvider>
  );
}
