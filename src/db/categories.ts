import type { Category, Loadable, Section } from "core/types";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";
import type { CategoryRecord, CategoriesTable, ItemsTable } from "./types";

export function useCategories(section: Section): Loadable<Category[]> {
  return useLiveQuery(
    async () => ({ status: "ready", data: await getCategories(section) }),
    [section],
    { status: "loading" }
  );
}

export async function getCategories(section: Section): Promise<Category[]> {
  const table = getTable(section);
  const records = await table.toArray();

  return records.map((record) => recordToCategory(record, section));
}

export async function addCategory(category: Category): Promise<string> {
  const table = getTable(category.section);
  const record = categoryToRecord(category);

  return table.add(record);
}

export async function updateCategory(category: Category): Promise<boolean> {
  const table = getTable(category.section);
  const record = categoryToRecord(category);

  return table.update(category.id, record).then(Boolean);
}

export async function deleteCategory(
  id: string,
  section: Section,
): Promise<void> {
  const categoriesTable = getTable(section);
  const itemsTable = getItemsTable(section);

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

function getTable(section: Section): CategoriesTable {
  return section === "income" ? db.incomeCategories : db.expenseCategories;
}

function getItemsTable(section: Section): ItemsTable {
  return section === "income" ? db.incomeItems : db.expenseItems;
}

function categoryToRecord(category: Category): CategoryRecord {
  const { id, name } = category;

  return { id, name };
}

function recordToCategory(record: CategoryRecord, section: Section): Category {
  const { id, name } = record;

  return { id, name, section };
}
