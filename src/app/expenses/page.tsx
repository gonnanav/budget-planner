"use client";

import { useContext } from "react";
import { BackupContext } from "@/contexts/BackupContext";
import { SectionScreen } from "@/components/section";

export default function Page() {
  const { backup, restore } = useContext(BackupContext);

  return (
    <SectionScreen
      addItemButtonLabel="Add Expense"
      addCategoryButtonLabel="Add Expense Category"
      selectedTab="expenses"
      headingText="Expenses"
      itemsTableName="expenses"
      categoriesTableName="expenseCategories"
      onBackup={backup}
      onRestore={restore}
    />
  );
}
