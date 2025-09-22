import { createEntry } from "./budget-entries";
import type { BudgetEntry, BudgetEntryInput } from "./types";

export function createTestEntry(
  input: BudgetEntryInput & { id?: string } = {},
): BudgetEntry {
  return createEntry(input.id ?? "1", input);
}

export function createTestEntries(
  inputs: Array<BudgetEntryInput & { id?: string }>,
): BudgetEntry[] {
  return inputs.map((input, index) => {
    const id = input.id ?? String(index + 1);
    return createTestEntry({ ...input, id });
  });
}
