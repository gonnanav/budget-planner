"use client";

import { AppHeroUIProvider } from "./AppHeroUIProvider";
import { StorageProvider } from "./StorageProvider";
import { IncomesProvider } from "./IncomesProvider";
import { ExpensesProvider } from "./ExpensesProvider";

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AppHeroUIProvider>
      <StorageProvider>
        <IncomesProvider>
          <ExpensesProvider>{children}</ExpensesProvider>
        </IncomesProvider>
      </StorageProvider>
    </AppHeroUIProvider>
  );
}
