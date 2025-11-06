"use client";

import { ToastProvider } from "@heroui/toast";
import { AppHeroUIProvider } from "./AppHeroUIProvider";
import { PathnameProvider } from "./PathnameProvider";
import { JsonBackupRestoreProvider } from "./JsonBackupRestoreProvider";
import { IncomeContext, IncomeContextValue } from "@/contexts/IncomeContext";
import { ExpenseContext, ExpenseContextValue } from "@/contexts/ExpenseContext";
import {
  IncomeCategoryContext,
  IncomeCategoryContextValue,
} from "@/contexts/IncomeCategoryContext";

interface ProvidersProps {
  incomes: IncomeContextValue;
  expenses: ExpenseContextValue;
  incomeCategories: IncomeCategoryContextValue;
  children: React.ReactNode;
}

export function Providers({
  incomes,
  expenses,
  incomeCategories,
  children,
}: Readonly<ProvidersProps>) {
  return (
    <AppHeroUIProvider>
      <IncomeContext value={incomes}>
        <IncomeCategoryContext value={incomeCategories}>
          <ExpenseContext value={expenses}>
            <PathnameProvider>
              <JsonBackupRestoreProvider>{children}</JsonBackupRestoreProvider>
            </PathnameProvider>
          </ExpenseContext>
        </IncomeCategoryContext>
      </IncomeContext>
      <ToastProvider />
    </AppHeroUIProvider>
  );
}
