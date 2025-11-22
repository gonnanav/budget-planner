import { useLiveQuery } from "dexie-react-hooks";
import { createCategory } from "@/core/categories";
import { Category } from "@/core/types";
import { db } from "./db";
import { BudgetItem } from "@/core/types";
import { EntityTable } from "dexie";

export function useIncomeCategories() {
  return useLiveQuery(() => db.incomeCategories.toArray());
}

export async function addIncomeCategory(name: string) {
  return db.incomeCategories.add(createCategory(crypto.randomUUID(), name));
}

export async function updateIncomeCategory(id: string, name: string) {
  const result = await db.incomeCategories.update(id, createCategory(id, name));
  return result === 1;
}

export async function deleteIncomeCategory(id: string) {
  return deleteCategory(id, db.incomeCategories, db.incomeItems);
}

export function useExpenseCategories() {
  return useLiveQuery(() => db.expenseCategories.toArray());
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
  return deleteCategory(id, db.expenseCategories, db.expenseItems);
}

async function deleteCategory(
  id: string,
  categoriesTable: EntityTable<Category, "id">,
  itemsTable: EntityTable<BudgetItem, "id">,
) {
  return db.transaction("rw", categoriesTable, itemsTable, async () => {
    await itemsTable
      .where("categoryId")
      .equals(id)
      .modify((item) => {
        delete item.categoryId;
      });

    return categoriesTable.delete(id);
  });
}
