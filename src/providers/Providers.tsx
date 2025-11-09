"use client";

import { ToastProvider } from "@heroui/toast";
import { AppHeroUIProvider } from "./AppHeroUIProvider";
import { PathnameProvider } from "./PathnameProvider";
import { IncomeContext, IncomeContextValue } from "@/contexts/IncomeContext";
import { ExpenseContext, ExpenseContextValue } from "@/contexts/ExpenseContext";

interface ProvidersProps {
  incomes: IncomeContextValue;
  expenses: ExpenseContextValue;
  children: React.ReactNode;
}

export function Providers({
  incomes,
  expenses,
  children,
}: Readonly<ProvidersProps>) {
  return (
    <AppHeroUIProvider>
      <IncomeContext value={incomes}>
        <ExpenseContext value={expenses}>
          <PathnameProvider>{children}</PathnameProvider>
        </ExpenseContext>
      </IncomeContext>
      <ToastProvider />
    </AppHeroUIProvider>
  );
}
