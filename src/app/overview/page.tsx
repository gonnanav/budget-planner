"use client";

import { useContext } from "react";
import { OverviewScreen } from "@/components/overview";
import { useIncomeItems, useExpenseItems } from "@/db/items";
import { BackupContext } from "@/contexts/BackupContext";

export default function Page() {
  const { items: incomeItems } = useIncomeItems();
  const { items: expenseItems } = useExpenseItems();
  const { backup, restore } = useContext(BackupContext);

  return (
    <OverviewScreen
      incomeItems={incomeItems}
      expenseItems={expenseItems}
      backup={backup}
      restore={restore}
    />
  );
}
