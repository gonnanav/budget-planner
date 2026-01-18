import type { Category } from "core/types";
import { db } from "../db";
import { categoryToRecord, recordToCategory } from "../mappers";
import { CategoryApi, ItemsTable, CategoriesTable } from "../types";

async function getCategories(
  categoriesTable: CategoriesTable,
): Promise<Category[]> {
  const records = await categoriesTable.toArray();

  return records.map(recordToCategory);
}

async function addCategory(
  categoriesTable: CategoriesTable,
  category: Category,
): Promise<string> {
  const record = categoryToRecord(category);

  return categoriesTable.add(record);
}

async function updateCategory(
  categoriesTable: CategoriesTable,
  category: Category,
): Promise<boolean> {
  const record = categoryToRecord(category);

  return categoriesTable.update(category.id, record).then(Boolean);
}

async function deleteCategory(
  id: string,
  categoriesTable: CategoriesTable,
  itemsTable: ItemsTable,
): Promise<void> {
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
): CategoryApi {
  return {
    getCategories: (): Promise<Category[]> => getCategories(categoriesTable),
    addCategory: (category: Category): Promise<string> =>
      addCategory(categoriesTable, category),
    updateCategory: (category: Category): Promise<boolean> =>
      updateCategory(categoriesTable, category),
    deleteCategory: (id: string): Promise<void> =>
      deleteCategory(id, categoriesTable, itemsTable),
  };
}
