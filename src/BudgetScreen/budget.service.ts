import { useLiveQuery } from "dexie-react-hooks";
import { createItemRecord, createBudget } from "./budget";
import type { Budget, ItemInput, CategoryInput, Section, ItemRecord } from "./types";
import { db, type DbItem, type DbCategory, type ItemsTable, type CategoriesTable } from "@/db";

export function useBudget(): Budget | undefined {
  return useLiveQuery(() => getBudget());
}

export async function addItem(section: Section, input: ItemInput): Promise<string> {
  const record = createItemRecord({ id: crypto.randomUUID(), ...input });

  return db.transaction("rw", getItemsTable(section), getCategoriesTable(section), async () => {
    const categories = await getDbCategories(section);
    const categoryId = await findOrCreateCategoryId(record.category, section, categories);

    return getItemsTable(section).add(toDbItem(record, categoryId));
  });
}

export async function updateItem(id: string, section: Section, input: ItemInput): Promise<boolean> {
  return db.transaction("rw", getItemsTable(section), getCategoriesTable(section), async () => {
    const categories = await getDbCategories(section);
    let categoryId: string | null | undefined;

    if (input.category !== undefined) {
      categoryId = await findOrCreateCategoryId(input.category, section, categories);
    }

    return getItemsTable(section).update(id, toDbItemChanges(input, categoryId)).then(Boolean);
  });
}

async function findOrCreateCategoryId(name: string, section: Section, categories: DbCategory[]): Promise<string | null> {
  if (name === "") return null;

  const category = getCategoryByName(name, categories);

  if (category) return category.id;

  const id = crypto.randomUUID();

  await getCategoriesTable(section).add({ id, name });

  return id;
}

export async function deleteItem(id: string, section: Section): Promise<void> {
  return getItemsTable(section).delete(id);
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

async function getBudget(): Promise<Budget> {
  const [incomeDbItems, incomeDbCategories, expenseDbItems, expenseDbCategories] = await Promise.all([
    getDbItems("income"),
    getDbCategories("income"),
    getDbItems("expenses"),
    getDbCategories("expenses"),
  ]);

  return createBudget(
    { items: fromDbItems(incomeDbItems, incomeDbCategories), categories: incomeDbCategories },
    { items: fromDbItems(expenseDbItems, expenseDbCategories), categories: expenseDbCategories },
  );
}

async function getDbItems(section: Section): Promise<DbItem[]> {
  return getItemsTable(section).toArray();
}

async function getDbCategories(section: Section): Promise<DbCategory[]> {
  return getCategoriesTable(section).toArray();
}

function toDbItemChanges(input: ItemInput, categoryId?: string | null): Partial<DbItem> {
  return {
    name: input.name,
    amount: input.amount,
    frequency: input.frequency,
    categoryId,
    notes: input.notes,
  };
}

function toDbItem(record: ItemRecord, categoryId: string | null): DbItem {
  return {
    id: record.id,
    name: record.name,
    amount: record.amount,
    frequency: record.frequency,
    categoryId,
    notes: record.notes,
  };
}

function fromDbItems(items: DbItem[], categories: DbCategory[]): ItemRecord[] {
  return items.map((item) => {
    const category = fromCategoryId(item.categoryId, categories);

    return fromDbItem(item, category);
  });
}

function fromDbItem(item: DbItem, category: string): ItemRecord {
  return {
    id: item.id,
    name: item.name,
    amount: item.amount,
    frequency: item.frequency,
    category,
    notes: item.notes,
  };
}

function fromCategoryId(id: string | null, categories: DbCategory[]): string {
  if (id === null) return "";

  const category = categories.find((c) => c.id === id);

  if (!category) throw new Error(`No category found with id: "${id}"`);

  return category.name;
}

function getCategoryByName(name: string, categories: DbCategory[]): DbCategory | null {
  return categories.find((c) => c.name.toLowerCase() === name.toLowerCase()) ?? null;
}

function getItemsTable(section: Section): ItemsTable {
  return section === "income" ? db.incomeItems : db.expenseItems;
}

function getCategoriesTable(section: Section): CategoriesTable {
  return section === "income" ? db.incomeCategories : db.expenseCategories;
}
