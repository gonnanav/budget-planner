import { createItem } from "domain/items";
import type { Item, CreateItemInput } from "domain/types";

export function createItemVariant(
  base: Item,
  overrides: Partial<CreateItemInput>,
): Item {
  return createItem({ ...base, ...overrides });
}

export function createTestItems(inputs: Partial<CreateItemInput>[]): Item[] {
  return inputs.map((input, index) => {
    const id = input.id ?? String(index + 1);
    const name = input.name ?? `Test item ${id}`;
    
    return createItem({ id, name, section: "expenses", ...input });
  });
}
