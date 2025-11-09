import { useLiveQuery } from "dexie-react-hooks";
import { createCategory } from "@/core/categories";
import { Category } from "@/core/types";
import { db } from "./db";
import { LIMITS } from "@/lib/limits";
import { enrichCategory } from "@/core/categories";
import { BudgetItem } from "@/core/types";
import { CategoriesTableName } from "./types";

export async function addCategory(
  tableName: CategoriesTableName,
  name: string,
) {
  const limit = LIMITS[tableName as keyof typeof LIMITS];
  const count = await db.table(tableName).count();
  if (count >= limit) {
    const categoryType = tableName.replace(/([A-Z])/g, " $1").toLowerCase();
    console.error(`You've reached the maximum number of ${categoryType}.`);
    return;
  }
  return db.table(tableName).add(createCategory(crypto.randomUUID(), name));
}

export async function updateCategory(
  tableName: CategoriesTableName,
  id: string,
  name: string,
) {
  await db.table(tableName).update(id, createCategory(id, name));
}

export async function deleteCategory(
  tableName: CategoriesTableName,
  id: string,
) {
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
}

export function addCategories(
  tableName: CategoriesTableName,
  categories: Category[],
) {
  return db.table(tableName).bulkAdd(categories);
}

export function useTableCategories(
  tableName: CategoriesTableName,
  items: BudgetItem[],
) {
  const categories = useLiveQuery(() => db.table(tableName).toArray()) as
    | Category[]
    | undefined;

  const count = useLiveQuery(() => db.table(tableName).count()) ?? 0;
  const limit = LIMITS[tableName as keyof typeof LIMITS];
  const isAtLimit = count >= limit;

  const enrichedCategories = categories?.map((category) =>
    enrichCategory(category, items),
  );

  return {
    categories: enrichedCategories ?? [],
    count,
    limit,
    isAtLimit,
  };
}
