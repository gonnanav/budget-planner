import type { Item, Section } from "core/types";
import { itemToRecord, recordToItem } from "../mappers";
import { ItemApi, ItemsTable } from "../types";

async function getItems(
  itemsTable: ItemsTable,
  section: Section,
): Promise<Item[]> {
  const records = await itemsTable.toArray();

  return records.map((record) => recordToItem(record, section));
}

async function addItem(itemsTable: ItemsTable, item: Item): Promise<string> {
  const record = itemToRecord(item);

  return itemsTable.add(record);
}

async function updateItem(
  itemsTable: ItemsTable,
  item: Item,
): Promise<boolean> {
  const record = itemToRecord(item);

  return itemsTable.update(item.id, record).then(Boolean);
}

async function deleteItem(itemsTable: ItemsTable, id: string): Promise<void> {
  return itemsTable.delete(id);
}

export function createItemApi(
  itemsTable: ItemsTable,
  section: Section,
): ItemApi {
  return {
    getItems: (): Promise<Item[]> => getItems(itemsTable, section),
    addItem: (item: Item): Promise<string> => addItem(itemsTable, item),
    updateItem: (item: Item): Promise<boolean> => updateItem(itemsTable, item),
    deleteItem: (id: string): Promise<void> => deleteItem(itemsTable, id),
  };
}
