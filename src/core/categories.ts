import type { BudgetItem, Category } from "./types";
import { calculateCategoryTotal } from "./budget-balance";
import { CHARACTER_LIMITS } from "../lib/limits";

export function createCategory(id: string, name: string): Category {
  validateId(id);
  validateName(name);

  return {
    id,
    name,
  };
}

export function updateCategory(category: Category, name: string): Category {
  validateName(name);

  return {
    ...category,
    name,
  };
}

function validateId(id: string): void {
  validateNonEmptyString(id, "Id");
}

function validateName(name: string): void {
  validateNonEmptyString(name, "Name");
  if (name.length > CHARACTER_LIMITS.categoryName) {
    throw new Error(`Category name must be ${CHARACTER_LIMITS.categoryName} characters or less`);
  }
}

function validateNonEmptyString(value: string, name: string): void {
  if (value.length === 0) {
    throw new Error(`${name} is required`);
  }
}

export function enrichCategory(
  category: Category,
  items: BudgetItem[],
): Category & { amount: number } {
  return {
    ...category,
    amount: calculateCategoryTotal(category.id, items),
  };
}
