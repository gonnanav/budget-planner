import type {
  BudgetEntry,
  BudgetEntryAmount,
  CreateBudgetEntryInput,
} from "./types";
import { normalizeAmount } from "./budget-balance";

export function createEntry(input: CreateBudgetEntryInput): BudgetEntry {
  validateName(input.name);
  validateAmount(input.amount);

  return { amount: null, frequency: "monthly", ...input };
}

function validateName(name?: string) {
  if (!name) throw new Error("Name is required");
}

function validateAmount(amount?: BudgetEntryAmount) {
  if (amount && amount < 0) throw new Error("Amount must be greater than 0");
}

export function enrichItem(
  entry: BudgetEntry,
): BudgetEntry & { normalizedAmount: number } {
  return {
    ...entry,
    normalizedAmount: normalizeAmount(entry),
  };
}
