"use client";

import { AppHeroUIProvider } from "./AppHeroUIProvider";
import { StorageProvider } from "./StorageProvider";
import { IncomeProvider } from "./IncomeProvider";
import { ExpenseProvider } from "./ExpenseProvider";

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AppHeroUIProvider>
      <StorageProvider>
        <IncomeProvider>
          <ExpenseProvider>{children}</ExpenseProvider>
        </IncomeProvider>
      </StorageProvider>
    </AppHeroUIProvider>
  );
}
