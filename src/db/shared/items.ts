import { useLiveQuery } from "dexie-react-hooks";
import { createItem } from "@/core/budget-items";
import { BudgetItem, BudgetItemInput } from "@/core/types";
import { EntityTable } from "dexie";

type ItemsTable = EntityTable<BudgetItem, "id">;

export interface ItemApi {
  useItems: () => BudgetItem[] | undefined;
  addItem: (input: BudgetItemInput) => Promise<string>;
  updateItem: (id: string, input: BudgetItemInput) => Promise<boolean>;
  deleteItem: (id: string) => Promise<void>;
}

function useItems(itemsTable: ItemsTable) {
  return useLiveQuery(() => itemsTable.toArray());
}

function addItem(itemsTable: ItemsTable, input: BudgetItemInput) {
  return itemsTable.add(createItem({ id: crypto.randomUUID(), ...input }));
}

async function updateItem(
  itemsTable: ItemsTable,
  id: string,
  input: BudgetItemInput,
) {
  const updatedCount = await itemsTable.update(
    id,
    createItem({ id, ...input }),
  );
  return updatedCount === 1;
}

function deleteItem(itemsTable: ItemsTable, id: string) {
  return itemsTable.delete(id);
}

export function createItemApi(itemsTable: ItemsTable): ItemApi {
  return {
    useItems: () => useItems(itemsTable),
    addItem: (input: BudgetItemInput) => addItem(itemsTable, input),
    updateItem: (id: string, input: BudgetItemInput) =>
      updateItem(itemsTable, id, input),
    deleteItem: (id: string) => deleteItem(itemsTable, id),
  };
}
