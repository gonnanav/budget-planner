import { useLiveQuery } from "dexie-react-hooks";
import { createItem } from "@/core/budget-items";
import { BudgetItem, BudgetItemInput } from "@/core/types";
import { db } from "./db";
import { LIMITS } from "@/lib/limits";
import { enrichItem } from "@/core/budget-items";
import { ItemsTableName } from "./types";

export async function addItem(
  tableName: ItemsTableName,
  input: BudgetItemInput,
) {
  const limit = LIMITS[tableName as keyof typeof LIMITS];
  const count = await db.table(tableName).count();
  if (count >= limit) {
    const itemType = tableName.replace(/([A-Z])/g, " $1").toLowerCase();
    console.error(`You've reached the maximum number of ${itemType}.`);
    return;
  }
  return db
    .table(tableName)
    .add(createItem({ id: crypto.randomUUID(), ...input }));
}

export function updateItem(
  tableName: ItemsTableName,
  id: string,
  input: BudgetItemInput,
) {
  return db.table(tableName).update(id, createItem({ id, ...input }));
}

export function deleteItem(tableName: ItemsTableName, id: string) {
  return db.table(tableName).delete(id);
}

export function addItems(
  tableName: ItemsTableName,
  inputItems: BudgetItemInput[],
) {
  const items = inputItems.map((input) =>
    createItem({ ...input, id: crypto.randomUUID() }),
  );
  return db.table(tableName).bulkAdd(items);
}

export function useTableItems(tableName: ItemsTableName) {
  const items = useLiveQuery(() => db.table(tableName).toArray()) as
    | BudgetItem[]
    | undefined;

  const count = useLiveQuery(() => db.table(tableName).count()) ?? 0;
  const limit = LIMITS[tableName as keyof typeof LIMITS];
  const isAtLimit = count >= limit;

  const enrichedItems = items?.map(enrichItem);

  return {
    items: enrichedItems ?? [],
    count,
    limit,
    isAtLimit,
  };
}

export async function addIncomeItem(input: BudgetItemInput): Promise<string> {
  return db.incomes.add(createItem({ id: crypto.randomUUID(), ...input }));
}

export async function updateIncomeItem(
  id: string,
  input: BudgetItemInput,
): Promise<boolean> {
  const updatedCount = await db.incomes.update(
    id,
    createItem({ id, ...input }),
  );

  return updatedCount === 1;
}

export async function deleteIncomeItem(id: string): Promise<void> {
  return db.incomes.delete(id);
}

export async function addExpenseItem(input: BudgetItemInput): Promise<string> {
  return db.expenses.add(createItem({ id: crypto.randomUUID(), ...input }));
}

export async function updateExpenseItem(
  id: string,
  input: BudgetItemInput,
): Promise<boolean> {
  const updatedCount = await db.expenses.update(
    id,
    createItem({ id, ...input }),
  );

  return updatedCount === 1;
}

export async function deleteExpenseItem(id: string): Promise<void> {
  return db.expenses.delete(id);
}

export function useIncomeItems() {
  return useTableItems("incomes");
}

export function useExpenseItems() {
  return useTableItems("expenses");
}
