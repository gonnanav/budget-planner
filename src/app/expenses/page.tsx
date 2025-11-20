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
      addItemButtonLabel="Add Expense"
      addCategoryButtonLabel="Add Expense Category"
      selectedTab="expenses"
      headingText="Expenses"
      items={items}
      categories={categories}
      onBackup={backup}
      onRestore={restore}
      onAddItem={addExpenseItem}
      onUpdateItem={updateExpenseItem}
      onDeleteItem={deleteExpenseItem}
      onAddCategory={addExpenseCategory}
      onUpdateCategory={updateExpenseCategory}
      onDeleteCategory={deleteExpenseCategory}
    />
  );
}
