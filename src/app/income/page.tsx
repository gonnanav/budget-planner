"use client";

import { useContext } from "react";
import { BackupContext } from "@/contexts/BackupContext";
import { SectionScreen } from "@/components/section";
import {
  useIncomeItems,
  addIncomeItem,
  updateIncomeItem,
  deleteIncomeItem,
} from "@/db/items";
import {
  useIncomeCategories,
  addIncomeCategory,
  updateIncomeCategory,
  deleteIncomeCategory,
} from "@/db/categories";

export default function Page() {
  const { backup, restore } = useContext(BackupContext);
  const { items } = useIncomeItems();
  const { categories } = useIncomeCategories();

  return (
    <SectionScreen
      addItemButtonLabel="Add Income"
      addCategoryButtonLabel="Add Income Category"
      selectedTab="income"
      headingText="Incomes"
      items={items}
      categories={categories}
      onBackup={backup}
      onRestore={restore}
      onAddItem={addIncomeItem}
      onUpdateItem={updateIncomeItem}
      onDeleteItem={deleteIncomeItem}
      onAddCategory={addIncomeCategory}
      onUpdateCategory={updateIncomeCategory}
      onDeleteCategory={deleteIncomeCategory}
    />
  );
}
