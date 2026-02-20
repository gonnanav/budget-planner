import { createItem, sumItems } from "domain/items";
import { createCategory, createCategorySummary } from "domain/categories";
import { createBudget } from "domain/budget";
import type { Budget, ItemInput, CategoryInput, Section, SectionState } from "domain/types";
import * as db from "db/budget";

export async function getBudget(): Promise<Budget> {
  const [incomeItems, expenseItems, incomeCats, expenseCats] = await Promise.all(
    [db.getItems("income"), db.getItems("expenses"), db.getCategories("income"), db.getCategories("expenses")],
  );

  const income: SectionState = {
    items: incomeItems,
    categories: incomeCats.map((c) => createCategorySummary(c, incomeItems)),
    sum: sumItems(incomeItems),
  };

  const expenses: SectionState = {
    items: expenseItems,
    categories: expenseCats.map((c) => createCategorySummary(c, expenseItems)),
    sum: sumItems(expenseItems),
  };

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
