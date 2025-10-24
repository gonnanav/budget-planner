import { useLiveQuery } from "dexie-react-hooks";
import { createItem } from "@/core/budget-items";
import { BudgetItem, BudgetItemInput } from "@/core/types";
import { db } from "@/lib/db";

export function useBudgetItems(key: string) {
  const items = useLiveQuery(() => db.table(key).toArray()) as
    | BudgetItem[]
    | undefined;

  const handleAddItem = (input: BudgetItemInput) => {
    db.table(key).add(createItem({ id: crypto.randomUUID(), ...input }));
  };

  const handleUpdateItem = (id: string, input: BudgetItemInput) => {
    db.table(key).update(id, createItem({ id, ...input }));
  };

  const handleDeleteItem = (id: string) => {
    db.table(key).delete(id);
  };

  const handleAddItems = (inputItems: BudgetItemInput[]) => {
    const items = inputItems.map((input) =>
      createItem({ ...input, id: crypto.randomUUID() }),
    );
    return db.table(key).bulkAdd(items);
  };

  return {
    items: items ?? [],
    addItem: handleAddItem,
    updateItem: handleUpdateItem,
    deleteItem: handleDeleteItem,
    addItems: handleAddItems,
  };
}
