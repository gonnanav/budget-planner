import { createItemRecord } from "./budget";
import type { ItemRecord, CreateItemInput } from "./types";

export function createTestItemRecord(input: Partial<CreateItemInput> = {}): ItemRecord {
  const id = input.id ?? "1";
  const name = input.name ?? `Test item ${id}`;

  return createItemRecord({ id, name, ...input });
}

export function createTestItemRecords(inputs: Partial<CreateItemInput>[]): ItemRecord[] {
  return inputs.map((input, index) =>
    createTestItemRecord({ id: String(index + 1), ...input }),
  );
}
