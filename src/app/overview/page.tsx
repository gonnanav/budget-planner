"use client";

import { useContext } from "react";
import { OverviewScreen } from "@/components/overview";
import { useTableItems } from "@/db";
import { BackupContext } from "@/contexts/BackupContext";

export default function Page() {
  const { items: incomeItems } = useTableItems("incomes");
  const { items: expenseItems } = useTableItems("expenses");
  const { backup, restore } = useContext(BackupContext);

  return (
    <OverviewScreen
      incomeItems={incomeItems}
      expenseItems={expenseItems}
      onBackup={backup}
      onRestore={restore}
    />
  );
}
