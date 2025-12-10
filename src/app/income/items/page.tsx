"use client";

import { useRouter } from "next/navigation";
import { ItemsScreen } from "@/components/items-screen";
import {
  useIncomeItems,
  addIncomeItem,
  updateIncomeItem,
  deleteIncomeItem,
} from "@/db/income/items";
import { useIncomeCategories } from "@/db/income/categories";
import { enrichItem } from "@/core/items";

export default function Page() {
  const router = useRouter();
  const items = useIncomeItems() ?? [];
  const categories = useIncomeCategories() ?? [];
  const enrichedItems = items.map(enrichItem);

  return (
    <ItemsScreen
      headingText="Income"
      items={enrichedItems}
      categoryOptions={categories}
      addItem={addIncomeItem}
      updateItem={updateIncomeItem}
      deleteItem={deleteIncomeItem}
      onViewChange={(view) => router.push(`/income/${view}`)}
    />
  );
}
