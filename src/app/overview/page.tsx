"use client";

import { useContext } from "react";
import { OverviewScreen } from "@/components/overview";
import { useIncomeItems } from "@/db/income/items";
import { useExpenseItems } from "@/db/expenses/items";
import { BackupContext } from "@/contexts/BackupContext";

export default function Page() {
  const incomeItems = useIncomeItems();
  const expenseItems = useExpenseItems();
  const { backup, restore } = useContext(BackupContext);

  return (
    <OverviewScreen
      incomeItems={incomeItems ?? []}
      expenseItems={expenseItems ?? []}
      backup={backup}
      restore={restore}
    />
  );
}
