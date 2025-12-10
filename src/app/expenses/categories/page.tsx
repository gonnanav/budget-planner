"use client";

import { useRouter } from "next/navigation";
import { CategoriesScreen } from "@/components/categories-screen";
import { useExpenseItems } from "@/db/expenses/items";
import {
  useExpenseCategories,
  addExpenseCategory,
  updateExpenseCategory,
  deleteExpenseCategory,
} from "@/db/expenses/categories";
import { enrichCategory } from "@/core/categories";

export default function Page() {
  const router = useRouter();
  const items = useExpenseItems() ?? [];
  const categories = useExpenseCategories() ?? [];
  const enrichedCategories = categories.map((category) =>
    enrichCategory(category, items),
  );

  return (
    <CategoriesScreen
      headingText="Expenses"
      categories={enrichedCategories}
      addCategory={addExpenseCategory}
      updateCategory={updateExpenseCategory}
      deleteCategory={deleteExpenseCategory}
      onViewChange={(view) => router.push(`/expenses/${view}`)}
    />
  );
}
