import { createItem, createItemRecord, createBudget } from "@/domain/budget";
import type { Budget, Item, Category, ItemInput, CategoryInput, Section } from "@/domain/types";
import { db, type ItemsTable, type CategoriesTable } from "@/db";

export async function getBudget(): Promise<Budget> {
  const [incomeItems, incomeCategories, expenseItems, expenseCategories] = await Promise.all([
    getItems("income"),
    getCategories("income"),
    getItems("expenses"),
    getCategories("expenses"),
  ]);

  return createBudget(
    { items: incomeItems, categories: incomeCategories },
    { items: expenseItems, categories: expenseCategories },
  );
}

export async function addItem(section: Section, input: ItemInput): Promise<string> {
  const record = createItemRecord({ id: crypto.randomUUID(), ...input });

  return getItemsTable(section).add(record);
}

export async function updateItem(id: string, section: Section, input: ItemInput): Promise<boolean> {
  return getItemsTable(section).update(id, input).then(Boolean);
}

export async function deleteItem(id: string, section: Section): Promise<void> {
  return getItemsTable(section).delete(id);
}

export async function addCategory(section: Section, input: CategoryInput): Promise<string> {
  return getCategoriesTable(section).add({ id: crypto.randomUUID(), ...input });
}

export async function updateCategory(id: string, section: Section, input: CategoryInput): Promise<boolean> {
  return getCategoriesTable(section).update(id, input).then(Boolean);
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

  return records.map(createItem);
}

async function getCategories(section: Section): Promise<Category[]> {
  return getCategoriesTable(section).toArray();
}

function getItemsTable(section: Section): ItemsTable {
  return section === "income" ? db.incomeItems : db.expenseItems;
}

function getCategoriesTable(section: Section): CategoriesTable {
  return section === "income" ? db.incomeCategories : db.expenseCategories;
}
