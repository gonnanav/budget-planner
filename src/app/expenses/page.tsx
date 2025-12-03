"use client";

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
  const items = useExpenseItems() ?? [];
  const categories = useExpenseCategories() ?? [];
  const enrichedItems = items?.map(enrichItem);
  const enrichedCategories = categories?.map((c) => enrichCategory(c, items));

  return (
    <SectionScreen
      headingText="Expenses"
      data={{ items: enrichedItems, categories: enrichedCategories }}
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
