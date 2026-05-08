import { createItem, createCategory, createBudget, createSectionState } from "@/domain/budget";
import type { Budget, Item, Category, ItemInput, CategoryInput, Section } from "@/domain/types";
import { db, type ItemRecord, type CategoryRecord, type ItemsTable, type CategoriesTable } from "@/db";

export async function getBudget(): Promise<Budget> {
  const [incomeItems, incomeCategories, expenseItems, expenseCategories] = await Promise.all([
    getItems("income"),
    getCategories("income"),
    getItems("expenses"),
    getCategories("expenses"),
  ]);

  const income = createSectionState(incomeItems, incomeCategories);
  const expenses = createSectionState(expenseItems, expenseCategories);

  return createBudget(income, expenses);
}

export async function addItem(input: ItemInput): Promise<string> {
  const item = createItem({ id: crypto.randomUUID(), ...input });
  const record = itemToRecord(item);

  return getItemsTable(item.section).add(record);
}

export async function updateItem(id: string, input: ItemInput): Promise<boolean> {
  const item = createItem({ id, ...input });
  const record = itemToRecord(item);

  return getItemsTable(item.section).update(item.id, record).then(Boolean);
}

export async function deleteItem(id: string, section: Section): Promise<void> {
  return getItemsTable(section).delete(id);
}

export async function addCategory(input: CategoryInput): Promise<string> {
  const category = createCategory({ id: crypto.randomUUID(), ...input });
  const record = categoryToRecord(category);

  return getCategoriesTable(category.section).add(record);
}

export async function updateCategory(id: string, input: CategoryInput): Promise<boolean> {
  const category = createCategory({ id, ...input });
  const record = categoryToRecord(category);

  return getCategoriesTable(category.section).update(category.id, record).then(Boolean);
}

export async function deleteCategory(id: string, section: Section): Promise<void> {
  const categoriesTable = getCategoriesTable(section);
  const itemsTable = getItemsTable(section);

  return db.transaction("rw", categoriesTable, itemsTable, async () => {
    await itemsTable
      .where("categoryId")
      .equals(id)
      .modify((item) => {
        item.categoryId = null;
      });

    await categoriesTable.delete(id);
  });
}

async function getItems(section: Section): Promise<Item[]> {
  const records = await getItemsTable(section).toArray();

  return records.map((record) => recordToItem(record, section));
}

async function getCategories(section: Section): Promise<Category[]> {
  const records = await getCategoriesTable(section).toArray();

  return records.map((record) => recordToCategory(record, section));
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

  return createItem({ id, name, amount, frequency, categoryId, notes, section });
}

function categoryToRecord(category: Category): CategoryRecord {
  const { id, name } = category;

  return { id, name };
}

function recordToCategory(record: CategoryRecord, section: Section): Category {
  const { id, name } = record;

  return { id, name, section };
}
