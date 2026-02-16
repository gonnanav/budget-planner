import { createItem } from "domain/items";
import type { Item, CreateItemInput, Section } from "domain/types";
import { electricity } from "./expenses";

type CreateTestItemInput = Omit<CreateItemInput, "id" | "name" | "section"> & {
  id?: string;
  name?: string;
  section?: Section;
};

export function createTestItem(input: CreateTestItemInput = {}): Item {
  return createItem({
    ...electricity,
    ...input,
    section: input.section ?? "expenses",
  });
}

export function createTestItems(inputs: Array<CreateTestItemInput>): Item[] {
  return inputs.map((input, index) => {
    const defaultId = String(index + 1);
    const defaultName = `Test item ${defaultId}`;

    return createTestItem({ id: defaultId, name: defaultName, ...input });
  });
}
