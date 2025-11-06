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
import {
  ExpenseCategoryContext,
  ExpenseCategoryContextValue,
} from "@/contexts/ExpenseCategoryContext";

interface ProvidersProps {
  incomes: IncomeContextValue;
  expenses: ExpenseContextValue;
  incomeCategories: IncomeCategoryContextValue;
  expenseCategories: ExpenseCategoryContextValue;
  children: React.ReactNode;
}

export function Providers({
  incomes,
  expenses,
  incomeCategories,
  expenseCategories,
  children,
}: Readonly<ProvidersProps>) {
  return (
    <AppHeroUIProvider>
      <IncomeContext value={incomes}>
        <IncomeCategoryContext value={incomeCategories}>
          <ExpenseContext value={expenses}>
            <ExpenseCategoryContext value={expenseCategories}>
              <PathnameProvider>
                <JsonBackupRestoreProvider>
                  {children}
                </JsonBackupRestoreProvider>
              </PathnameProvider>
            </ExpenseCategoryContext>
          </ExpenseContext>
        </IncomeCategoryContext>
      </IncomeContext>
      <ToastProvider />
    </AppHeroUIProvider>
  );
}
