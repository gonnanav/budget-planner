import { useLiveQuery } from "dexie-react-hooks";
import { createItemRecord, createBudget } from "./budget";
import type { Budget, ItemInput, CategoryInput, Section, ItemRecord } from "./types";
import { db, type DbItem, type ItemsTable } from "@/db";

export function useBudget(): Budget | undefined {
  return useLiveQuery(() => getBudget());
}

export async function addItem(section: Section, input: ItemInput): Promise<string> {
  const category = await normalizeCategoryCase(input.category, section);
  const record = createItemRecord({ id: crypto.randomUUID(), ...input, category });

  return getItemsTable(section).add(toDbItem(record));
}

export async function updateItem(id: string, section: Section, input: ItemInput): Promise<boolean> {
  const category = await normalizeCategoryCase(input.category, section);

  return getItemsTable(section).update(id, toDbItemChanges({ ...input, category })).then(Boolean);
}

export async function deleteItem(id: string, section: Section): Promise<void> {
  return getItemsTable(section).delete(id);
}

export async function updateCategory(name: string, section: Section, input: CategoryInput): Promise<void> {
  await getItemsTable(section)
    .where("category").equals(name)
    .modify({ category: input.name });
}

export async function deleteCategory(name: string, section: Section): Promise<void> {
  await getItemsTable(section)
    .where("category").equals(name)
    .modify({ category: "" });
}

async function getBudget(): Promise<Budget> {
  const [income, expenses] = await Promise.all([
    getItems("income"),
    getItems("expenses"),
  ]);

  return createBudget(income, expenses);
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
    category: input.category,
    notes: input.notes,
  };
}

function toDbItem(record: ItemRecord): DbItem {
  return {
    id: record.id,
    name: record.name,
    amount: record.amount,
    frequency: record.frequency,
    category: record.category,
    notes: record.notes,
  };
}

function fromDbItem(item: DbItem): ItemRecord {
  return {
    id: item.id,
    name: item.name,
    amount: item.amount,
    frequency: item.frequency,
    category: item.category,
    notes: item.notes,
  };
}

async function normalizeCategoryCase(name: string | undefined, section: Section): Promise<string> {
  if (!name) return "";

  const match = await getItemsTable(section)
    .where("category")
    .equalsIgnoreCase(name)
    .first();

  return match?.category ?? name;
}

function getItemsTable(section: Section): ItemsTable {
  return section === "income" ? db.income : db.expenses;
}
