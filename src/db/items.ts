import { useLiveQuery } from "dexie-react-hooks";
import { createItem } from "@/core/budget-items";
import { BudgetItemInput } from "@/core/types";
import { db } from "./db";

export function useIncomeItems() {
  return useLiveQuery(() => db.incomeItems.toArray());
}

export async function addIncomeItem(input: BudgetItemInput): Promise<string> {
  return db.incomeItems.add(createItem({ id: crypto.randomUUID(), ...input }));
}

export async function updateIncomeItem(
  id: string,
  input: BudgetItemInput,
): Promise<boolean> {
  const updatedCount = await db.incomeItems.update(
    id,
    createItem({ id, ...input }),
  );

  return updatedCount === 1;
}

export async function deleteIncomeItem(id: string): Promise<void> {
  return db.incomeItems.delete(id);
}

export function useExpenseItems() {
  return useLiveQuery(() => db.expenseItems.toArray());
}

export async function addExpenseItem(input: BudgetItemInput): Promise<string> {
  return db.expenseItems.add(createItem({ id: crypto.randomUUID(), ...input }));
}

export async function updateExpenseItem(
  id: string,
  input: BudgetItemInput,
): Promise<boolean> {
  const updatedCount = await db.expenseItems.update(
    id,
    createItem({ id, ...input }),
  );

  return updatedCount === 1;
}

export async function deleteExpenseItem(id: string): Promise<void> {
  return db.expenseItems.delete(id);
}
