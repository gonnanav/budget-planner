import { createItem } from "core/items";
import type { Category, Item } from "core/types";
import type { CategoryRecord, ItemRecord } from "./types";

export function itemToRecord(item: Item): ItemRecord {
  const { id, name, amount, frequency, categoryId, notes } = item;

  return { id, name, amount, frequency, categoryId, notes };
}

export function recordToItem(record: ItemRecord): Item {
  const { id, name, amount, frequency, categoryId, notes } = record;

  return createItem({ id, name, amount, frequency, categoryId, notes });
}

export function categoryToRecord(category: Category): CategoryRecord {
  const { id, name } = category;

  return { id, name };
}

export function recordToCategory(record: CategoryRecord): Category {
  const { id, name } = record;

  return { id, name };
}
