import type {
  BudgetEntry,
  BudgetEntryAmount,
  CreateBudgetEntryInput,
} from "./types";

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
