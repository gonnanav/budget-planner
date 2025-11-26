import type { Item, ItemAmount, CreateItemInput } from "./types";
import { normalizeAmount } from "./balance";
import { CHARACTER_LIMITS } from "../lib/limits";

export function createItem(input: CreateItemInput): Item {
  validateName(input.name);
  validateNotes(input.notes);
  validateAmount(input.amount);

  return { amount: null, frequency: "monthly", ...input };
}

function validateName(name?: string) {
  if (!name) throw new Error("Name is required");
  if (name.length > CHARACTER_LIMITS.itemName)
    throw new Error(
      `Name must be ${CHARACTER_LIMITS.itemName} characters or less`,
    );
}

function validateNotes(notes?: string) {
  if (notes && notes.length > CHARACTER_LIMITS.itemNotes)
    throw new Error(
      `Notes must be ${CHARACTER_LIMITS.itemNotes} characters or less`,
    );
}

function validateAmount(amount?: ItemAmount) {
  if (amount && amount < 0) throw new Error("Amount must be greater than 0");
}

export function enrichItem(item: Item): Item & { normalizedAmount: number } {
  return {
    ...item,
    normalizedAmount: normalizeAmount(item),
  };
}
