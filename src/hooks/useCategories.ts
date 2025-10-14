import { useLiveQuery } from "dexie-react-hooks";
import { createCategory } from "@/core/categories";
import { Category } from "@/core/types";
import { db } from "@/lib/db";

type CategoryTableName = "incomeCategories" | "expenseCategories";

export function useCategories(tableName: CategoryTableName) {
  const categories = useLiveQuery(() => db.table(tableName).toArray()) as
    | Category[]
    | undefined;

  const handleAddCategory = async (name: string) => {
    await db.table(tableName).add(createCategory(crypto.randomUUID(), name));
  };

  const handleUpdateCategory = async (id: string, name: string) => {
    await db.table(tableName).update(id, createCategory(id, name));
  };

  const handleDeleteCategory = async (id: string) => {
    await db.transaction(
      "rw",
      [db.expenses, db.incomes, db.expenseCategories, db.incomeCategories],
      async () => {
        const entriesTable =
          tableName === "expenseCategories" ? db.expenses : db.incomes;

        await entriesTable
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

  return {
    categories: categories ?? [],
    addCategory: handleAddCategory,
    updateCategory: handleUpdateCategory,
    deleteCategory: handleDeleteCategory,
    addCategories: handleAddCategories,
  };
}
