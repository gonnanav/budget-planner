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
import { enrichItem } from "@/core/budget-items";

export default function Page() {
  const backupActions = useContext(BackupContext);
  const items = useExpenseItems();
  const { categories } = useExpenseCategories();
  const enrichedItems = items?.map(enrichItem) ?? [];

  return (
    <SectionScreen
      selectedTab="expenses"
      headingText="Expenses"
      labels={{
        addItem: "Add expense item",
        addCategory: "Add expense category",
      }}
      data={{ items: enrichedItems, categories }}
      backupActions={backupActions}
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
