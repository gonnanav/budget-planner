import type { Item, Section } from "core/types";
import { createItem } from "core/items";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";
import type { ItemRecord, ItemsTable } from "./types";

export function useItems(section: Section): Item[] | undefined {
  return useLiveQuery(() => getItems(section), [section]);
}

export async function getItems(section: Section): Promise<Item[]> {
  const table = getTable(section);
  const records = await table.toArray();

  return records.map((record) => recordToItem(record, section));
}

export async function addItem(item: Item): Promise<string> {
  const table = getTable(item.section);
  const record = itemToRecord(item);

  return table.add(record);
}

export async function updateItem(item: Item): Promise<boolean> {
  const table = getTable(item.section);
  const record = itemToRecord(item);

  return table.update(item.id, record).then(Boolean);
}

export async function deleteItem(id: string, section: Section): Promise<void> {
  const table = getTable(section);

  return table.delete(id);
}

function getTable(section: Section): ItemsTable {
  return section === "income" ? db.incomeItems : db.expenseItems;
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
