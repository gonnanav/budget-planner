import { useLiveQuery } from "dexie-react-hooks";
import { createCategory } from "@/core/categories";
import { Category } from "@/core/types";
import { db } from "./db";
import { LIMITS } from "@/lib/limits";
import { enrichCategory } from "@/core/categories";
import { BudgetItem } from "@/core/types";

type CategoryTableName = "incomeCategories" | "expenseCategories";

export function useIndexedDbCategories(
  tableName: CategoryTableName,
  items: BudgetItem[],
) {
  const categories = useLiveQuery(() => db.table(tableName).toArray()) as
    | Category[]
    | undefined;

  const count = useLiveQuery(() => db.table(tableName).count()) ?? 0;
  const limit = LIMITS[tableName as keyof typeof LIMITS];
  const isAtLimit = count >= limit;

  const handleAddCategory = (name: string) => {
    if (count >= limit) {
      const categoryType = tableName.replace(/([A-Z])/g, " $1").toLowerCase();
      console.error(`You've reached the maximum number of ${categoryType}.`);
      return;
    }
    db.table(tableName).add(createCategory(crypto.randomUUID(), name));
  };

  const handleUpdateCategory = async (id: string, name: string) => {
    await db.table(tableName).update(id, createCategory(id, name));
  };

  const handleDeleteCategory = async (id: string) => {
    await db.transaction(
      "rw",
      [db.expenses, db.incomes, db.expenseCategories, db.incomeCategories],
      async () => {
        const itemsTable =
          tableName === "expenseCategories" ? db.expenses : db.incomes;

        await itemsTable
          .where("categoryId")
          .equals(id)
          .modify({ categoryId: undefined });

        await db.table(tableName).delete(id);
      },
    );
  };

  const handleAddCategories = (categories: Category[]) => {
    return db.table(tableName).bulkAdd(categories);
  };

  const enrichedCategories = categories?.map((category) =>
    enrichCategory(category, items),
  );

  return {
    categories: enrichedCategories ?? [],
    count,
    limit,
    isAtLimit,
    addCategory: handleAddCategory,
    updateCategory: handleUpdateCategory,
    deleteCategory: handleDeleteCategory,
    addCategories: handleAddCategories,
  };
}
