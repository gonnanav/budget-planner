import { createItem } from "@/domain/items/items";
import type { Item, CreateItemInput } from "@/domain/types";

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
