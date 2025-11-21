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
      selectedTab="income"
      headingText="Incomes"
      labels={{
        addItem: "Add Income",
        addCategory: "Add Income Category",
      }}
      data={{ items, categories }}
      backup={{ onBackup: backup, onRestore: restore }}
      itemActions={{
        add: addIncomeItem,
        update: updateIncomeItem,
        delete: deleteIncomeItem,
      }}
      categoryActions={{
        add: addIncomeCategory,
        update: updateIncomeCategory,
        delete: deleteIncomeCategory,
      }}
    />
  );
}
