"use client";

import { useContext } from "react";
import { BackupContext } from "@/contexts/BackupContext";
import { SectionScreen } from "@/components/section";

export default function Page() {
  const { backup, restore } = useContext(BackupContext);

  return (
    <SectionScreen
      addItemButtonLabel="Add Income"
      addCategoryButtonLabel="Add Income Category"
      selectedTab="incomes"
      headingText="Incomes"
      itemsTableName="incomes"
      categoriesTableName="incomeCategories"
      onBackup={backup}
      onRestore={restore}
    />
  );
}
