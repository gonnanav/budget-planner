import { useLiveQuery } from "dexie-react-hooks";
import { createCategory } from "@/core/categories";
import { Category } from "@/core/types";
import { db } from "./db";
import { LIMITS } from "@/lib/limits";
import { enrichCategory } from "@/core/categories";
import { BudgetItem } from "@/core/types";
import { CategoriesTableName } from "./types";
import { useIncomeItems, useExpenseItems } from "@/db/items";

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

export async function addIncomeCategory(name: string) {
  return db.incomeCategories.add(createCategory(crypto.randomUUID(), name));
}

export async function updateIncomeCategory(id: string, name: string) {
  const result = await db.incomeCategories.update(id, createCategory(id, name));
  return result === 1;
}

export async function deleteIncomeCategory(id: string) {
  return db.incomeCategories.delete(id);
}

export function useIncomeCategories() {
  const { items } = useIncomeItems();

  return useTableCategories("incomeCategories", items);
}

export async function addExpenseCategory(name: string) {
  return db.expenseCategories.add(createCategory(crypto.randomUUID(), name));
}

export async function updateExpenseCategory(id: string, name: string) {
  const result = await db.expenseCategories.update(
    id,
    createCategory(id, name),
  );
  return result === 1;
}

export async function deleteExpenseCategory(id: string) {
  return db.expenseCategories.delete(id);
}

export function useExpenseCategories() {
  const { items } = useExpenseItems();

  return useTableCategories("expenseCategories", items);
}
