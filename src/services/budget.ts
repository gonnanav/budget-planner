import { createItem } from "domain/items";
import { createCategory } from "domain/categories";
import { createBudget, createSectionState } from "domain/budget";
import type { Budget, ItemInput, CategoryInput, Section } from "domain/types";
import * as db from "db/budget";

export async function getBudget(): Promise<Budget> {
  const [incomeItems, incomeCategories, expenseItems, expenseCategories] = await Promise.all(
    [db.getItems("income"), db.getCategories("income"), db.getItems("expenses"), db.getCategories("expenses")],
  );

  const income = createSectionState(incomeItems, incomeCategories);
  const expenses = createSectionState(expenseItems, expenseCategories);

  return createBudget(income, expenses);
}

export async function addItem(input: ItemInput): Promise<string> {
  const item = createItem({ id: crypto.randomUUID(), ...input });

  return db.addItem(item);
}

export async function updateItem(id: string, input: ItemInput): Promise<boolean> {
  const item = createItem({ id, ...input });

  return db.updateItem(item);
}

export function deleteItem(id: string, section: Section): Promise<void> {
  return db.deleteItem(id, section);
}

export async function addCategory(input: CategoryInput): Promise<string> {
  const category = createCategory({ id: crypto.randomUUID(), ...input });

  return db.addCategory(category);
}

export async function updateCategory(id: string, input: CategoryInput): Promise<boolean> {
  const category = createCategory({ id, ...input });

  return db.updateCategory(category);
}

export function deleteCategory(id: string, section: Section): Promise<void> {
  return db.deleteCategory(id, section);
}
