"use client";

import { SectionScreen } from "@/components/section";
import {
  useIncomeItems,
  addIncomeItem,
  updateIncomeItem,
  deleteIncomeItem,
} from "@/db/income/items";
import {
  useIncomeCategories,
  addIncomeCategory,
  updateIncomeCategory,
  deleteIncomeCategory,
} from "@/db/income/categories";
import { enrichItem } from "@/core/items";
import { enrichCategory } from "@/core/categories";

export default function Page() {
  const items = useIncomeItems() ?? [];
  const categories = useIncomeCategories() ?? [];
  const enrichedItems = items?.map(enrichItem);
  const enrichedCategories = categories?.map((c) => enrichCategory(c, items));

  return (
    <SectionScreen
      selectedTab="income"
      headingText="Income"
      labels={{
        addItem: "Add income item",
        addCategory: "Add income category",
      }}
      data={{ items: enrichedItems, categories: enrichedCategories }}
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
