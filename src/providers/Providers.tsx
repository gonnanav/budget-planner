"use client";

import { AppHeroUIProvider } from "./AppHeroUIProvider";
import { IncomesProvider } from "./IncomesProvider";
import { ExpensesProvider } from "./ExpensesProvider";
import { PathnameProvider } from "./PathnameProvider";
import { JsonExportImportProvider } from "./JsonExportImportProvider";

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AppHeroUIProvider>
      <IncomesProvider>
        <ExpensesProvider>
          <PathnameProvider>
            <JsonExportImportProvider>{children}</JsonExportImportProvider>
          </PathnameProvider>
        </ExpensesProvider>
      </IncomesProvider>
    </AppHeroUIProvider>
  );
}
