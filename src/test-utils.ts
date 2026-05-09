import { createItem, createItemRecord } from "@/domain/budget";
import type { Item, CreateItemInput } from "@/domain/types";

export function createTestItem(input: Partial<CreateItemInput> = {}): Item {
  const id = input.id ?? "1";
  const name = input.name ?? `Test item ${id}`;
  const record = createItemRecord({ id, name, ...input });
  return createItem(record);
}

export function createTestItems(inputs: Partial<CreateItemInput>[]): Item[] {
  return inputs.map((input, index) =>
    createTestItem({ id: String(index + 1), ...input }),
  );
}
