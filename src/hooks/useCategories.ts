import { useLiveQuery } from "dexie-react-hooks";
import { createCategory } from "@/core/categories";
import { Category } from "@/core/types";
import { db } from "@/lib/db";

type CategoryTableName = "incomeCategories" | "expenseCategories";

export function useCategories(tableName: CategoryTableName) {
  const categories = useLiveQuery(() => db.table(tableName).toArray()) as
    | Category[]
    | undefined;

  const handleAddCategory = (name: string) => {
    db.table(tableName).add(createCategory(crypto.randomUUID(), name));
  };

  const handleUpdateCategory = (id: string, name: string) => {
    db.table(tableName).update(id, createCategory(id, name));
  };

  const handleDeleteCategory = (id: string) => {
    db.table(tableName).delete(id);
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
