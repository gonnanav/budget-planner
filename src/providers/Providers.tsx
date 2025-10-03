"use client";

import { AppHeroUIProvider } from "./AppHeroUIProvider";
import { IncomesProvider } from "./IncomesProvider";
import { ExpensesProvider } from "./ExpensesProvider";
import { PathnameProvider } from "./PathnameProvider";

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AppHeroUIProvider>
      <IncomesProvider>
        <ExpensesProvider>
          <PathnameProvider>{children}</PathnameProvider>
        </ExpensesProvider>
      </IncomesProvider>
    </AppHeroUIProvider>
  );
}
