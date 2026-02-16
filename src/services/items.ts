import { createItem } from "domain/items";
import type { ItemInput, Section } from "domain/types";
import * as db from "db/items";

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
