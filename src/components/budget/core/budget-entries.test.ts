import { test, expect } from "vitest";
import {
  createEntry,
  addEntry,
  updateEntryIn,
  removeEntry,
} from "./budget-entries";

test("creates a budget entry with the given amount", () => {
  const budgetEntry = createEntry("1", { amount: 100 });

  expect(budgetEntry).toMatchObject({ amount: 100 });
});

test("creates a budget entry with zero amount when null is provided", () => {
  const budgetEntry = createEntry("1", { amount: null });

  expect(budgetEntry).toMatchObject({ amount: 0 });
});

test("creates a budget entry with zero amount when undefined is provided", () => {
  const budgetEntry = createEntry("1", { amount: undefined });

  expect(budgetEntry).toMatchObject({ amount: 0 });
});

test("creates a budget entry with zero amount when no amount is provided", () => {
  const budgetEntry = createEntry("1");

  expect(budgetEntry).toMatchObject({ amount: 0 });
});

test("adds a new budget entry with the given amount", () => {
  const budgetEntries = [createEntry("1", { amount: 100 })];
  const updatedBudgetEntries = addEntry(budgetEntries, "2", { amount: 200 });

  expect(updatedBudgetEntries).toEqual([
    { id: "1", amount: 100 },
    { id: "2", amount: 200 },
  ]);
});

test("updates the budget entry amount at the given index", () => {
  const budgetEntries = [
    createEntry("1", { amount: 100 }),
    createEntry("2", { amount: 50 }),
  ];
  const updatedBudgetEntries = updateEntryIn(budgetEntries, 1, {
    amount: 200,
  });

  expect(updatedBudgetEntries).toEqual([
    { id: "1", amount: 100 },
    { id: "2", amount: 200 },
  ]);
});

test("throws error for invalid index when updating", () => {
  const budgetEntries = [createEntry("1", { amount: 100 })];

  expect(() => updateEntryIn(budgetEntries, -1, { amount: 200 })).toThrow();
  expect(() => updateEntryIn(budgetEntries, 1, { amount: 200 })).toThrow();
});

test("removes the budget entry at the given index", () => {
  const budgetEntries = [
    createEntry("1", { amount: 100 }),
    createEntry("2", { amount: 50 }),
  ];
  const updated = removeEntry(budgetEntries, 1);

  expect(updated).toMatchObject([{ id: "1" }]);
});

test("throws error for invalid index when deleting", () => {
  const budgetEntries = [
    createEntry("1", { amount: 100 }),
    createEntry("2", { amount: 50 }),
  ];

  expect(() => removeEntry(budgetEntries, -1)).toThrow();
  expect(() => removeEntry(budgetEntries, 2)).toThrow();
});
