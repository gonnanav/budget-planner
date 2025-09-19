import { test, expect } from "vitest";
import {
  createBudgetEntries,
  addBudgetEntry,
  updateBudgetEntry,
  removeBudgetEntry,
  makeLabel,
} from "./budget-entries";

test("creates an empty array of budget entries by default", () => {
  const budgetEntries = createBudgetEntries();

  expect(budgetEntries).toEqual([]);
});

test("creates budget entries based on the given values provided", () => {
  const budgetEntries = createBudgetEntries([
    { amount: 100 },
    { amount: 50 },
    { amount: 75 },
  ]);

  expect(budgetEntries).toEqual([
    { amount: 100 },
    { amount: 50 },
    { amount: 75 },
  ]);
});

test("adds a new budget entry with the given amount", () => {
  const budgetEntries = [{ amount: 100 }, { amount: 50 }];
  const updatedBudgetEntries = addBudgetEntry(budgetEntries, 200);

  expect(updatedBudgetEntries).toEqual([
    { amount: 100 },
    { amount: 50 },
    { amount: 200 },
  ]);
});

test("updates the budget entry amount at the given index", () => {
  const budgetEntries = [{ amount: 100 }, { amount: 50 }, { amount: 75 }];
  const updatedBudgetEntries = updateBudgetEntry(budgetEntries, 1, {
    amount: 200,
  });

  expect(updatedBudgetEntries).toEqual([
    { amount: 100 },
    { amount: 200 },
    { amount: 75 },
  ]);
});

test("throws error for invalid index when updating", () => {
  const budgetEntries = [{ amount: 100 }, { amount: 50 }];

  expect(() => updateBudgetEntry(budgetEntries, -1, { amount: 200 })).toThrow();
  expect(() => updateBudgetEntry(budgetEntries, 2, { amount: 200 })).toThrow();
});

test("removes the budget entry at the given index", () => {
  const budgetEntries = [{ amount: 100 }, { amount: 50 }, { amount: 75 }];
  const updatedBudgetEntries = removeBudgetEntry(budgetEntries, 1);

  expect(updatedBudgetEntries).toEqual([{ amount: 100 }, { amount: 75 }]);
});

test("throws error for invalid index when removing", () => {
  const budgetEntries = [{ amount: 100 }, { amount: 50 }];

  expect(() => removeBudgetEntry(budgetEntries, -1)).toThrow();
  expect(() => removeBudgetEntry(budgetEntries, 2)).toThrow();
});

test("formats the budget entry label", () => {
  const entryLabel = makeLabel("Budget Entry");
  expect(entryLabel(0)).toBe("Budget Entry 1");
  expect(entryLabel(1)).toBe("Budget Entry 2");
});
