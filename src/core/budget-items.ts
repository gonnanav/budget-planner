import type { BudgetItem, ItemAmount, CreateBudgetItemInput } from "./types";
import { normalizeAmount } from "./budget-balance";

export function createItem(input: CreateBudgetItemInput): BudgetItem {
  validateName(input.name);
  validateAmount(input.amount);

  return { amount: null, frequency: "monthly", ...input };
}

function validateName(name?: string) {
  if (!name) throw new Error("Name is required");
}

function validateAmount(amount?: ItemAmount) {
  if (amount && amount < 0) throw new Error("Amount must be greater than 0");
}

export function enrichItem(
  item: BudgetItem,
): BudgetItem & { normalizedAmount: number } {
  return {
    ...item,
    normalizedAmount: normalizeAmount(item),
  };
}
