import { createEntry } from "./budget-entries";
import type { BudgetEntry, CreateBudgetEntryInput } from "./types";

type CreateTestEntryInput = Omit<CreateBudgetEntryInput, "id" | "name"> & {
  id?: string;
  name?: string;
};

export function createTestEntry(input: CreateTestEntryInput = {}): BudgetEntry {
  return createEntry({ id: "1", name: "Test entry", ...input });
}

export function createTestEntries(
  inputs: Array<CreateTestEntryInput>,
): BudgetEntry[] {
  return inputs.map((input, index) => {
    const defaultId = String(index + 1);
    const defaultName = `Test entry ${defaultId}`;

    return createTestEntry({ id: defaultId, name: defaultName, ...input });
  });
}
