"use client";

import { useRouter } from "next/navigation";
import { CategoriesScreen } from "@/components/categories-screen";
import { getIncomeItems } from "@/db/income/items";
import {
  getIncomeCategories,
  addIncomeCategory,
  updateIncomeCategory,
  deleteIncomeCategory,
} from "@/db/income/categories";
import { enrichCategory } from "@/core/categories";
import { Category } from "@/core/types";
import { useLiveQuery } from "dexie-react-hooks";

export default function Page() {
  const router = useRouter();
  const items = useLiveQuery(getIncomeItems) ?? [];
  const categories = useLiveQuery(getIncomeCategories) ?? [];
  const enrichedCategories = categories.map((category: Category) =>
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
