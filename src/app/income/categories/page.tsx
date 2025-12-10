"use client";

import { useRouter } from "next/navigation";
import { CategoriesScreen } from "@/components/categories-screen";
import { useIncomeItems } from "@/db/income/items";
import {
  useIncomeCategories,
  addIncomeCategory,
  updateIncomeCategory,
  deleteIncomeCategory,
} from "@/db/income/categories";
import { enrichCategory } from "@/core/categories";

export default function Page() {
  const router = useRouter();
  const items = useIncomeItems() ?? [];
  const categories = useIncomeCategories() ?? [];
  const enrichedCategories = categories.map((category) =>
    enrichCategory(category, items),
  );

  return (
    <CategoriesScreen
      headingText="Income"
      categories={enrichedCategories}
      addCategory={addIncomeCategory}
      updateCategory={updateIncomeCategory}
      deleteCategory={deleteIncomeCategory}
      onViewChange={(view) => router.push(`/income/${view}`)}
    />
  );
}
