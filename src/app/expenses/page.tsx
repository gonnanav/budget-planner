"use client";

import { useContext } from "react";
import { BackupContext } from "@/contexts/BackupContext";
import { SectionScreen } from "@/components/section";
import {
  useExpenseItems,
  addExpenseItem,
  updateExpenseItem,
  deleteExpenseItem,
} from "@/db/expenses/items";
import {
  useExpenseCategories,
  addExpenseCategory,
  updateExpenseCategory,
  deleteExpenseCategory,
} from "@/db/expenses/categories";
import { enrichItem } from "@/core/items";
import { enrichCategory } from "@/core/categories";

export default function Page() {
  const backupActions = useContext(BackupContext);
  const items = useExpenseItems() ?? [];
  const categories = useExpenseCategories() ?? [];
  const enrichedItems = items?.map(enrichItem);
  const enrichedCategories = categories?.map((c) => enrichCategory(c, items));

  return (
    <SectionScreen
      selectedTab="expenses"
      headingText="Expenses"
      labels={{
        addItem: "Add expense item",
        addCategory: "Add expense category",
      }}
      data={{ items: enrichedItems, categories: enrichedCategories }}
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
