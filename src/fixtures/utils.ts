import { createItem } from "domain/items";
import type { Item, CreateItemInput } from "domain/types";

export function createItemVariant(
  base: Item,
  overrides: Partial<CreateItemInput>,
): Item {
  return createItem({ ...base, ...overrides });
}

export function createTestItem(input: Partial<CreateItemInput> = {}): Item {
  const id = input.id ?? "1";
  const name = input.name ?? `Test item ${id}`;
  return createItem({ id, name, section: "expenses", ...input });
}

export function createTestItems(inputs: Partial<CreateItemInput>[]): Item[] {
  return inputs.map((input, index) =>
    createTestItem({ id: String(index + 1), ...input }),
  );
}
