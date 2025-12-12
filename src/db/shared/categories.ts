import { createCategory } from "@/core/categories";
import { db } from "../db";
import { ItemsTable, CategoriesTable } from "../types";

async function getCategories(categoriesTable: CategoriesTable) {
  return categoriesTable.toArray();
}

async function addCategory(categoriesTable: CategoriesTable, name: string) {
  return categoriesTable.add(createCategory(crypto.randomUUID(), name));
}

async function updateCategory(
  categoriesTable: CategoriesTable,
  id: string,
  name: string,
) {
  return categoriesTable.update(id, createCategory(id, name)).then(Boolean);
}

async function deleteCategory(
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

export function createCategoryApi(
  categoriesTable: CategoriesTable,
  itemsTable: ItemsTable,
) {
  return {
    getCategories: () => getCategories(categoriesTable),
    addCategory: (name: string) => addCategory(categoriesTable, name),
    updateCategory: (id: string, name: string) =>
      updateCategory(categoriesTable, id, name),
    deleteCategory: (id: string) =>
      deleteCategory(id, categoriesTable, itemsTable),
  };
}
