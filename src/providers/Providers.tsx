"use client";

import { ToastProvider } from "@heroui/toast";
import { AppHeroUIProvider } from "./AppHeroUIProvider";
import { IncomesProvider } from "./IncomesProvider";
import { ExpensesProvider } from "./ExpensesProvider";
import { IncomeCategoriesProvider } from "./IncomeCategoriesProvider";
import { ExpenseCategoriesProvider } from "./ExpenseCategoriesProvider";
import { PathnameProvider } from "./PathnameProvider";
import { JsonBackupRestoreProvider } from "./JsonBackupRestoreProvider";
import { CategoryDrawerProvider } from "./CategoryDrawerProvider";

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AppHeroUIProvider>
      <IncomesProvider>
        <ExpensesProvider>
          <IncomeCategoriesProvider>
            <ExpenseCategoriesProvider>
              <PathnameProvider>
                <JsonBackupRestoreProvider>
                  <CategoryDrawerProvider>{children}</CategoryDrawerProvider>
                </JsonBackupRestoreProvider>
              </PathnameProvider>
            </ExpenseCategoriesProvider>
          </IncomeCategoriesProvider>
        </ExpensesProvider>
      </IncomesProvider>
      <ToastProvider />
    </AppHeroUIProvider>
  );
}
