"use client";

import { BudgetScreen } from "components/BudgetScreen";
import { createCategory } from "core/categories";
import { calculateBalance } from "core/balance";
import { createItem } from "core/items";
import type { BudgetState, CategoryInput, ItemInput } from "core/types";
import { addItem, updateItem, deleteItem } from "db/items";
import { addCategory, updateCategory, deleteCategory } from "db/categories";
import { useSectionData } from "./useSectionData";

export default function Page() {
  const income = useSectionData("income");
  const expenses = useSectionData("expenses");

  const balanceLoading = income.items.isLoading || expenses.items.isLoading;
  const balanceData = !balanceLoading
    ? calculateBalance(income.items.data, expenses.items.data)
    : null;

  const budgetState: BudgetState = {
    income,
    expenses,
    balance: {
      data: balanceData
        ? { status: balanceData.status, delta: balanceData.balance }
        : { status: "balanced", delta: 0 },
      isLoading: balanceLoading,
    },
  };

  const handleAddItem = async (input: ItemInput) => {
    const item = createItem({ id: crypto.randomUUID(), ...input });
    await addItem(item);
  };

  const handleUpdateItem = async (id: string, input: ItemInput) => {
    const item = createItem({ id, ...input });
    await updateItem(item);
  };

  const handleAddCategory = async (input: CategoryInput) => {
    const category = createCategory({ id: crypto.randomUUID(), ...input });
    await addCategory(category);
  };

  const handleUpdateCategory = async (id: string, input: CategoryInput) => {
    const category = createCategory({ id, ...input });
    await updateCategory(category);
  };

  return (
    <BudgetScreen
      state={budgetState}
      actions={{
        item: {
          onAdd: handleAddItem,
          onUpdate: handleUpdateItem,
          onDelete: deleteItem,
        },
        category: {
          onAdd: handleAddCategory,
          onUpdate: handleUpdateCategory,
          onDelete: deleteCategory,
        },
      }}
    />
  );
}
