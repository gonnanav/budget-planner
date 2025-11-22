import { useLiveQuery } from "dexie-react-hooks";
import { createCategory } from "@/core/categories";
import { Category } from "@/core/types";
import { db } from "../db";
import { BudgetItem } from "@/core/types";
import { EntityTable } from "dexie";

type ItemsTable = EntityTable<BudgetItem, "id">;
type CategoriesTable = EntityTable<Category, "id">;

export function createCategoryApi(
  categoriesTable: CategoriesTable,
  itemsTable: ItemsTable,
) {
  return {
    useCategories: () => useCategories(categoriesTable),
    addCategory: (name: string) => addCategory(categoriesTable, name),
    updateCategory: (id: string, name: string) =>
      updateCategory(categoriesTable, id, name),
    deleteCategory: (id: string) =>
      deleteCategory(id, categoriesTable, itemsTable),
  };
}

function useCategories(categoriesTable: CategoriesTable) {
  return useLiveQuery(() => categoriesTable.toArray());
}

function addCategory(categoriesTable: CategoriesTable, name: string) {
  return categoriesTable.add(createCategory(crypto.randomUUID(), name));
}

async function updateCategory(
  categoriesTable: CategoriesTable,
  id: string,
  name: string,
) {
  const result = await categoriesTable.update(id, createCategory(id, name));
  return result === 1;
}

function deleteCategory(
  id: string,
  categoriesTable: CategoriesTable,
  itemsTable: ItemsTable,
) {
  return db.transaction("rw", categoriesTable, itemsTable, async () => {
    await itemsTable
      .where("categoryId")
      .equals(id)
      .modify((item) => {
        delete item.categoryId;
      });

    await categoriesTable.delete(id);
  });
}
