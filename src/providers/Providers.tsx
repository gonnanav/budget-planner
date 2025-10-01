"use client";

import { HeroUIProvider } from "@heroui/react";
import { StorageProvider } from "./StorageProvider";
import { IncomeProvider } from "./IncomeProvider";
import { ExpenseProvider } from "./ExpenseProvider";

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <HeroUIProvider>
      <StorageProvider>
        <IncomeProvider>
          <ExpenseProvider>{children}</ExpenseProvider>
        </IncomeProvider>
      </StorageProvider>
    </HeroUIProvider>
  );
}
