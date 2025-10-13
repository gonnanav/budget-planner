import type { Category } from "./types";

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
}

function validateNonEmptyString(value: string, name: string): void {
  if (value.length === 0) {
    throw new Error(`${name} is required`);
  }
}
