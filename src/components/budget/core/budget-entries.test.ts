import { test, expect } from "vitest";
import {
  createBudgetEntry,
  addBudgetEntry,
  updateBudgetEntry,
  deleteBudgetEntry,
} from "./budget-entries";

test("creates a budget entry with the given amount", () => {
  const budgetEntry = createBudgetEntry({ amount: 100 });

  expect(budgetEntry).toEqual({ amount: 100 });
});

test("creates a budget entry with zero amount when null is provided", () => {
  const budgetEntry = createBudgetEntry({ amount: null });

  expect(budgetEntry).toEqual({ amount: 0 });
});

test("creates a budget entry with zero amount when undefined is provided", () => {
  const budgetEntry = createBudgetEntry({ amount: undefined });

  expect(budgetEntry).toEqual({ amount: 0 });
});

test("creates a budget entry with zero amount when no amount is provided", () => {
  const budgetEntry = createBudgetEntry();

  expect(budgetEntry).toEqual({ amount: 0 });
});

test("adds a new budget entry with the given amount", () => {
  const budgetEntries = [createBudgetEntry({ amount: 100 })];
  const updatedBudgetEntries = addBudgetEntry(budgetEntries, { amount: 200 });

  expect(updatedBudgetEntries).toEqual([{ amount: 100 }, { amount: 200 }]);
});

test("updates the budget entry amount at the given index", () => {
  const budgetEntries = [
    createBudgetEntry({ amount: 100 }),
    createBudgetEntry({ amount: 50 }),
  ];
  const updatedBudgetEntries = updateBudgetEntry(budgetEntries, 1, {
    amount: 200,
  });

  expect(updatedBudgetEntries).toEqual([{ amount: 100 }, { amount: 200 }]);
});

test("throws error for invalid index when updating", () => {
  const budgetEntries = [createBudgetEntry({ amount: 100 })];

  expect(() => updateBudgetEntry(budgetEntries, -1, { amount: 200 })).toThrow();
  expect(() => updateBudgetEntry(budgetEntries, 1, { amount: 200 })).toThrow();
});

test("deletes the budget entry at the given index", () => {
  const budgetEntries = [
    createBudgetEntry({ amount: 100 }),
    createBudgetEntry({ amount: 50 }),
  ];
  const updatedBudgetEntries = deleteBudgetEntry(budgetEntries, 1);

  expect(updatedBudgetEntries).toEqual([{ amount: 100 }]);
});

test("throws error for invalid index when deleting", () => {
  const budgetEntries = [
    createBudgetEntry({ amount: 100 }),
    createBudgetEntry({ amount: 50 }),
  ];

  expect(() => deleteBudgetEntry(budgetEntries, -1)).toThrow();
  expect(() => deleteBudgetEntry(budgetEntries, 2)).toThrow();
});
