import { createItem } from "@/core/budget-items";
import type { BudgetItem, CreateBudgetItemInput } from "@/core/types";
import { electricity } from "./expenses";

type CreateTestItemInput = Omit<CreateBudgetItemInput, "id" | "name"> & {
  id?: string;
  name?: string;
};

export function createTestItem(input: CreateTestItemInput = {}): BudgetItem {
  return createItem({ ...electricity, ...input });
}

export function createTestItems(
  inputs: Array<CreateTestItemInput>,
): BudgetItem[] {
  return inputs.map((input, index) => {
    const defaultId = String(index + 1);
    const defaultName = `Test item ${defaultId}`;

    return createTestItem({ id: defaultId, name: defaultName, ...input });
  });
}
