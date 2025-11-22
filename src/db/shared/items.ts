import { useLiveQuery } from "dexie-react-hooks";
import { createItem } from "@/core/budget-items";
import { BudgetItemInput } from "@/core/types";
import { ItemsTable } from "../types";

function useItems(itemsTable: ItemsTable) {
  return useLiveQuery(() => itemsTable.toArray());
}

async function addItem(itemsTable: ItemsTable, input: BudgetItemInput) {
  return itemsTable.add(createItem({ id: crypto.randomUUID(), ...input }));
}

async function updateItem(
  itemsTable: ItemsTable,
  id: string,
  input: BudgetItemInput,
) {
  return itemsTable.update(id, createItem({ id, ...input })).then(Boolean);
}

async function deleteItem(itemsTable: ItemsTable, id: string) {
  return itemsTable.delete(id);
}

export function createItemApi(itemsTable: ItemsTable) {
  return {
    useItems: () => useItems(itemsTable),
    addItem: (input: BudgetItemInput) => addItem(itemsTable, input),
    updateItem: (id: string, input: BudgetItemInput) =>
      updateItem(itemsTable, id, input),
    deleteItem: (id: string) => deleteItem(itemsTable, id),
  };
}
