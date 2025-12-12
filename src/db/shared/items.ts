import { createItem } from "@/core/items";
import { ItemInput } from "@/core/types";
import { ItemsTable } from "../types";

async function getItems(itemsTable: ItemsTable) {
  return itemsTable.toArray();
}

async function addItem(itemsTable: ItemsTable, input: ItemInput) {
  return itemsTable.add(createItem({ id: crypto.randomUUID(), ...input }));
}

async function updateItem(
  itemsTable: ItemsTable,
  id: string,
  input: ItemInput,
) {
  return itemsTable.update(id, createItem({ id, ...input })).then(Boolean);
}

async function deleteItem(itemsTable: ItemsTable, id: string) {
  return itemsTable.delete(id);
}

export function createItemApi(itemsTable: ItemsTable) {
  return {
    getItems: () => getItems(itemsTable),
    addItem: (input: ItemInput) => addItem(itemsTable, input),
    updateItem: (id: string, input: ItemInput) =>
      updateItem(itemsTable, id, input),
    deleteItem: (id: string) => deleteItem(itemsTable, id),
  };
}
