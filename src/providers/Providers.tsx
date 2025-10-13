"use client";

import { AppHeroUIProvider } from "./AppHeroUIProvider";
import { IncomesProvider } from "./IncomesProvider";
import { ExpensesProvider } from "./ExpensesProvider";
import { IncomeCategoriesProvider } from "./IncomeCategoriesProvider";
import { ExpenseCategoriesProvider } from "./ExpenseCategoriesProvider";
import { PathnameProvider } from "./PathnameProvider";
import { JsonExportImportProvider } from "./JsonExportImportProvider";

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
                <JsonExportImportProvider>{children}</JsonExportImportProvider>
              </PathnameProvider>
            </ExpenseCategoriesProvider>
          </IncomeCategoriesProvider>
        </ExpensesProvider>
      </IncomesProvider>
    </AppHeroUIProvider>
  );
}
