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
  const backupActions = useContext(BackupContext);
  const { items } = useIncomeItems();
  const { categories } = useIncomeCategories();

  return (
    <SectionScreen
      selectedTab="income"
      headingText="Income"
      labels={{
        addItem: "Add income item",
        addCategory: "Add income category",
      }}
      data={{ items, categories }}
      backupActions={backupActions}
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
