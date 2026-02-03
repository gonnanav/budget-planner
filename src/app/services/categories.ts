import { createCategory } from "core/categories";
import type { CategoryInput, Section } from "core/types";
import * as db from "db/categories";

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
