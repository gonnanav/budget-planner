"use client";

import { BudgetScreen } from "components/BudgetScreen";
import { createCategory } from "core/categories";
import { createItem } from "core/items";
import type { CategoryInput, ItemInput } from "core/types";
import { addItem, updateItem, deleteItem } from "db/items";
import { addCategory, updateCategory, deleteCategory } from "db/categories";
import { useBudget } from "./hooks/useBudget";

export default function Page() {
  const budget = useBudget();

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
      budget={budget}
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
