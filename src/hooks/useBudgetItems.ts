import { useLiveQuery } from "dexie-react-hooks";
import { createItem } from "@/core/budget-items";
import { BudgetItem, BudgetItemInput } from "@/core/types";
import { db } from "@/lib/db";
import { LIMITS } from "@/lib/limits";

export function useBudgetItems(key: string) {
  const items = useLiveQuery(() => db.table(key).toArray()) as
    | BudgetItem[]
    | undefined;

  const count = useLiveQuery(() => db.table(key).count()) ?? 0;
  const limit = LIMITS[key as keyof typeof LIMITS];
  const isAtLimit = count >= limit;

  const handleAddItem = (input: BudgetItemInput) => {
    if (count >= limit) {
      const itemType = key.replace(/([A-Z])/g, " $1").toLowerCase();
      console.error(`You've reached the maximum number of ${itemType}.`);
      return;
    }
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
    count,
    limit,
    isAtLimit,
    addItem: handleAddItem,
    updateItem: handleUpdateItem,
    deleteItem: handleDeleteItem,
    addItems: handleAddItems,
  };
}
