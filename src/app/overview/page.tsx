"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { OverviewScreen } from "@/components/overview";
import { useTableItems } from "@/db";
import { BackupContext } from "@/contexts/BackupContext";

export default function Page() {
  const router = useRouter();
  const { items: incomeItems } = useTableItems("incomes");
  const { items: expenseItems } = useTableItems("expenses");
  const { backup, restore } = useContext(BackupContext);

  const handleIncomeClick = () => {
    router.push("/income");
  };

  const handleExpenseClick = () => {
    router.push("/expenses");
  };

  return (
    <OverviewScreen
      incomeItems={incomeItems}
      expenseItems={expenseItems}
      onIncomeClick={handleIncomeClick}
      onExpenseClick={handleExpenseClick}
      onBackup={backup}
      onRestore={restore}
    />
  );
}
