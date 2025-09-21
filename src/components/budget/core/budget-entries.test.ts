import { test, expect } from "vitest";
import {
  createEntry,
  addEntry,
  updateEntryIn,
  removeEntry,
} from "./budget-entries";

test("creates a budget entry with the given amount", () => {
  const budgetEntry = createEntry({ amount: 100 });

  expect(budgetEntry).toEqual({ amount: 100 });
});

test("creates a budget entry with zero amount when null is provided", () => {
  const budgetEntry = createEntry({ amount: null });

  expect(budgetEntry).toEqual({ amount: 0 });
});

test("creates a budget entry with zero amount when undefined is provided", () => {
  const budgetEntry = createEntry({ amount: undefined });

  expect(budgetEntry).toEqual({ amount: 0 });
});

test("creates a budget entry with zero amount when no amount is provided", () => {
  const budgetEntry = createEntry();

  expect(budgetEntry).toEqual({ amount: 0 });
});

test("adds a new budget entry with the given amount", () => {
  const budgetEntries = [createEntry({ amount: 100 })];
  const updatedBudgetEntries = addEntry(budgetEntries, { amount: 200 });

  expect(updatedBudgetEntries).toEqual([{ amount: 100 }, { amount: 200 }]);
});

test("updates the budget entry amount at the given index", () => {
  const budgetEntries = [
    createEntry({ amount: 100 }),
    createEntry({ amount: 50 }),
  ];
  const updatedBudgetEntries = updateEntryIn(budgetEntries, 1, {
    amount: 200,
  });

  expect(updatedBudgetEntries).toEqual([{ amount: 100 }, { amount: 200 }]);
});

test("throws error for invalid index when updating", () => {
  const budgetEntries = [createEntry({ amount: 100 })];

  expect(() => updateEntryIn(budgetEntries, -1, { amount: 200 })).toThrow();
  expect(() => updateEntryIn(budgetEntries, 1, { amount: 200 })).toThrow();
});

test("deletes the budget entry at the given index", () => {
  const budgetEntries = [
    createEntry({ amount: 100 }),
    createEntry({ amount: 50 }),
  ];
  const updatedBudgetEntries = removeEntry(budgetEntries, 1);

  expect(updatedBudgetEntries).toEqual([{ amount: 100 }]);
});

test("throws error for invalid index when deleting", () => {
  const budgetEntries = [
    createEntry({ amount: 100 }),
    createEntry({ amount: 50 }),
  ];

  expect(() => removeEntry(budgetEntries, -1)).toThrow();
  expect(() => removeEntry(budgetEntries, 2)).toThrow();
});
