"use client";

import { BudgetScreen } from "components/BudgetScreen";
import { addItem, updateItem, deleteItem } from "./services/items";
import { addCategory, updateCategory, deleteCategory } from "./services/categories";
import { useBudget } from "./hooks/useBudget";

export default function Page() {
  const budget = useBudget();

  return (
    <BudgetScreen
      budget={budget}
      actions={{
        item: {
          onAdd: addItem,
          onUpdate: updateItem,
          onDelete: deleteItem,
        },
        category: {
          onAdd: addCategory,
          onUpdate: updateCategory,
          onDelete: deleteCategory,
        },
      }}
    />
  );
}
