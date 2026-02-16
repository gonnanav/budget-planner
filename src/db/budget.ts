import type { Item, Category, Section } from "domain/types";
import { createItem } from "domain/items";
import { db } from "./db";
import type {
  ItemRecord,
  ItemsTable,
  CategoryRecord,
  CategoriesTable,
} from "./types";

export async function getItems(section: Section): Promise<Item[]> {
  const table = getItemsTable(section);
  const records = await table.toArray();

  return records.map((record) => recordToItem(record, section));
}

export async function addItem(item: Item): Promise<string> {
  const table = getItemsTable(item.section);
  const record = itemToRecord(item);

  return table.add(record);
}

export async function updateItem(item: Item): Promise<boolean> {
  const table = getItemsTable(item.section);
  const record = itemToRecord(item);

  return table.update(item.id, record).then(Boolean);
}

export async function deleteItem(
  id: string,
  section: Section,
): Promise<void> {
  const table = getItemsTable(section);

  return table.delete(id);
}

export async function getCategories(section: Section): Promise<Category[]> {
  const table = getCategoriesTable(section);
  const records = await table.toArray();

  return records.map((record) => recordToCategory(record, section));
}

export async function addCategory(category: Category): Promise<string> {
  const table = getCategoriesTable(category.section);
  const record = categoryToRecord(category);

  return table.add(record);
}

export async function updateCategory(category: Category): Promise<boolean> {
  const table = getCategoriesTable(category.section);
  const record = categoryToRecord(category);

  return table.update(category.id, record).then(Boolean);
}

export async function deleteCategory(
  id: string,
  section: Section,
): Promise<void> {
  const categoriesTable = getCategoriesTable(section);
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

function getItemsTable(section: Section): ItemsTable {
  return section === "income" ? db.incomeItems : db.expenseItems;
}

function getCategoriesTable(section: Section): CategoriesTable {
  return section === "income" ? db.incomeCategories : db.expenseCategories;
}

function itemToRecord(item: Item): ItemRecord {
  const { id, name, amount, frequency, categoryId, notes } = item;

  return { id, name, amount, frequency, categoryId, notes };
}

function recordToItem(record: ItemRecord, section: Section): Item {
  const { id, name, amount, frequency, categoryId, notes } = record;

  return createItem({
    id,
    name,
    amount,
    frequency,
    categoryId,
    notes,
    section,
  });
}

function categoryToRecord(category: Category): CategoryRecord {
  const { id, name } = category;

  return { id, name };
}

function recordToCategory(record: CategoryRecord, section: Section): Category {
  const { id, name } = record;

  return { id, name, section };
}
