"use client";

import { useRouter } from "next/navigation";
import { CategoriesScreen } from "@/components/categories-screen";
import { getExpenseItems } from "@/db/expenses/items";
import {
  getExpenseCategories,
  addExpenseCategory,
  updateExpenseCategory,
  deleteExpenseCategory,
} from "@/db/expenses/categories";
import { enrichCategory } from "@/core/categories";
import { useLiveQuery } from "dexie-react-hooks";

export default function Page() {
  const router = useRouter();
  const items = useLiveQuery(getExpenseItems) ?? [];
  const categories = useLiveQuery(getExpenseCategories) ?? [];
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
