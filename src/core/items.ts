import type { Item, ItemAmount, CreateItemInput } from "./types";
import { CHARACTER_LIMITS } from "../lib/limits";

export function createItem(input: CreateItemInput): Item {
  validateName(input.name);
  validateNotes(input.notes);
  validateAmount(input.amount);

  const item = {
    id: input.id,
    name: input.name,
    amount: input.amount ?? null,
    frequency: input.frequency ?? "monthly",
    categoryId: input.categoryId,
    notes: input.notes,
  };

  return {
    ...item,
    normalizedAmount: normalizeAmount(item),
  };
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

export function enrichItem(item: Item): Item {
  return {
    ...item,
    normalizedAmount: normalizeAmount(item),
  };
}

export function sumItems(items: Item[]): number {
  return items.reduce((sum: number, item) => sum + item.normalizedAmount, 0);
}

function normalizeAmount({
  amount,
  frequency,
}: Pick<Item, "amount" | "frequency">): number {
  return (amount ?? 0) / (frequency === "biMonthly" ? 2 : 1);
}
