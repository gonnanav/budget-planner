import type {
  Item,
  Category,
  CategoryWithAmount,
  CreateCategoryInput,
} from "./types";
import { sumItems } from "./items";
import { CHARACTER_LIMITS } from "../lib/limits";

export function createCategory(input: CreateCategoryInput): Category {
  validateId(input.id);
  validateName(input.name);

  return {
    id: input.id,
    name: input.name,
  };
}

function validateId(id: string): void {
  validateNonEmptyString(id, "Id");
}

function validateName(name: string): void {
  validateNonEmptyString(name, "Name");
  if (name.length > CHARACTER_LIMITS.categoryName) {
    throw new Error(
      `Category name must be ${CHARACTER_LIMITS.categoryName} characters or less`,
    );
  }
}

function validateNonEmptyString(value: string, name: string): void {
  if (value.length === 0) {
    throw new Error(`${name} is required`);
  }
}

export function sumCategoryItems(categoryId: string, items: Item[]): number {
  return sumItems(items.filter((item) => item.categoryId === categoryId));
}

export function enrichCategory(
  category: Category,
  items: Item[],
): CategoryWithAmount {
  return {
    ...category,
    amount: sumCategoryItems(category.id, items),
  };
}
