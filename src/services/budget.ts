import { useLiveQuery } from "dexie-react-hooks";
import { createItemRecord, createBudget } from "@/domain/budget";
import type { Budget, CategoryRecord, ItemInput, CategoryInput, Section, ItemRecord, Loadable } from "@/domain/types";
import { db, type DbItem, type ItemsTable, type CategoriesTable } from "@/db";

export function useBudget(): Loadable<Budget> {
  return useLiveQuery(
    async () => {
      const data = await getBudget();
      return { status: "ready" as const, data };
    },
    [],
    { status: "loading" as const },
  );
}

export async function addItem(section: Section, input: ItemInput): Promise<string> {
  const record = createItemRecord({ id: crypto.randomUUID(), ...input });

  return getItemsTable(section).add(toDbItem(record));
}

export async function updateItem(id: string, section: Section, input: ItemInput): Promise<boolean> {
  return getItemsTable(section).update(id, toDbItemChanges(input)).then(Boolean);
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

async function getBudget(): Promise<Budget> {
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

async function getItems(section: Section): Promise<ItemRecord[]> {
  const items = await getItemsTable(section).toArray();

  return items.map(fromDbItem);
}

function toDbItemChanges(input: ItemInput): Partial<DbItem> {
  return {
    name: input.name,
    amount: input.amount,
    frequency: input.frequency,
    categoryId: input.categoryId,
    notes: input.notes,
  };
}

function toDbItem(record: ItemRecord): DbItem {
  return {
    id: record.id,
    name: record.name,
    amount: record.amount,
    frequency: record.frequency,
    categoryId: record.categoryId,
    notes: record.notes,
  };
}

function fromDbItem(item: DbItem): ItemRecord {
  return {
    id: item.id,
    name: item.name,
    amount: item.amount,
    frequency: item.frequency,
    categoryId: item.categoryId,
    notes: item.notes,
  };
}

async function getCategories(section: Section): Promise<CategoryRecord[]> {
  return getCategoriesTable(section).toArray();
}

function getItemsTable(section: Section): ItemsTable {
  return section === "income" ? db.incomeItems : db.expenseItems;
}

function getCategoriesTable(section: Section): CategoriesTable {
  return section === "income" ? db.incomeCategories : db.expenseCategories;
}
