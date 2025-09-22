import { createEntry } from "./budget-entries";
import type { BudgetEntry, CreateBudgetEntryInput } from "./types";

type CreateTestEntryInput = Omit<CreateBudgetEntryInput, "id"> & {
  id?: string;
};

export function createTestEntry(
  input: CreateTestEntryInput = { id: "1" },
): BudgetEntry {
  return createEntry({ id: "1", ...input });
}

export function createTestEntries(
  inputs: Array<CreateTestEntryInput>,
): BudgetEntry[] {
  return inputs.map((input, index) => {
    const defaultId = String(index + 1);
    return createTestEntry({ id: defaultId, ...input });
  });
}
