"use client";

import { useRouter } from "next/navigation";
import { ItemsScreen } from "@/components/items-screen";
import {
  useExpenseItems,
  addExpenseItem,
  updateExpenseItem,
  deleteExpenseItem,
} from "@/db/expenses/items";
import { useExpenseCategories } from "@/db/expenses/categories";
import { enrichItem } from "@/core/items";

export default function Page() {
  const router = useRouter();
  const items = useExpenseItems() ?? [];
  const categories = useExpenseCategories() ?? [];
  const enrichedItems = items.map(enrichItem);

  return (
    <ItemsScreen
      headingText="Expenses"
      items={enrichedItems}
      categoryOptions={categories}
      addItem={addExpenseItem}
      updateItem={updateExpenseItem}
      deleteItem={deleteExpenseItem}
      onViewChange={(view) => router.push(`/expenses/${view}`)}
    />
  );
}
