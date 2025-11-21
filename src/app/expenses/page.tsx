"use client";

import { useContext } from "react";
import { BackupContext } from "@/contexts/BackupContext";
import { SectionScreen } from "@/components/section";
import {
  useExpenseItems,
  addExpenseItem,
  updateExpenseItem,
  deleteExpenseItem,
} from "@/db/items";
import {
  useExpenseCategories,
  addExpenseCategory,
  updateExpenseCategory,
  deleteExpenseCategory,
} from "@/db/categories";

export default function Page() {
  const { backup, restore } = useContext(BackupContext);
  const { items } = useExpenseItems();
  const { categories } = useExpenseCategories();

  return (
    <SectionScreen
      selectedTab="expenses"
      headingText="Expenses"
      labels={{
        addItem: "Add Expense",
        addCategory: "Add Expense Category",
      }}
      data={{ items, categories }}
      backup={{ onBackup: backup, onRestore: restore }}
      itemActions={{
        add: addExpenseItem,
        update: updateExpenseItem,
        delete: deleteExpenseItem,
      }}
      categoryActions={{
        add: addExpenseCategory,
        update: updateExpenseCategory,
        delete: deleteExpenseCategory,
      }}
    />
  );
}
