import { createItem } from "@/core/items";
import type { Item, CreateItemInput } from "@/core/types";
import { electricity } from "./expenses";

type CreateTestItemInput = Omit<CreateItemInput, "id" | "name"> & {
  id?: string;
  name?: string;
};

export function createTestItem(input: CreateTestItemInput = {}): Item {
  return createItem({ ...electricity, ...input });
}

export function createTestItems(inputs: Array<CreateTestItemInput>): Item[] {
  return inputs.map((input, index) => {
    const defaultId = String(index + 1);
    const defaultName = `Test item ${defaultId}`;

    return createTestItem({ id: defaultId, name: defaultName, ...input });
  });
}
