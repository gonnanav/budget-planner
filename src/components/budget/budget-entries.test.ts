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
  const budgetEntries = createBudgetEntries([100, 50, 75]);

  expect(budgetEntries).toEqual([100, 50, 75]);
});

test("adds a new budget entry with the given amount", () => {
  const budgetEntries = [100, 50];
  const updatedBudgetEntries = addBudgetEntry(budgetEntries, 200);

  expect(updatedBudgetEntries).toEqual([100, 50, 200]);
});

test("updates the budget entry amount at the given index", () => {
  const budgetEntries = [100, 50, 75];
  const updatedBudgetEntries = updateBudgetEntry(budgetEntries, 1, 200);

  expect(updatedBudgetEntries).toEqual([100, 200, 75]);
});

test("throws error for invalid index when updating", () => {
  const budgetEntries = [100, 50];

  expect(() => updateBudgetEntry(budgetEntries, -1, 200)).toThrow();
  expect(() => updateBudgetEntry(budgetEntries, 2, 200)).toThrow();
});

test("removes the budget entry at the given index", () => {
  const budgetEntries = [100, 50, 75];
  const updatedBudgetEntries = removeBudgetEntry(budgetEntries, 1);

  expect(updatedBudgetEntries).toEqual([100, 75]);
});

test("throws error for invalid index when removing", () => {
  const budgetEntries = [100, 50];

  expect(() => removeBudgetEntry(budgetEntries, -1)).toThrow();
  expect(() => removeBudgetEntry(budgetEntries, 2)).toThrow();
});

test("formats the budget entry label", () => {
  const entryLabel = makeLabel("Budget Entry");
  expect(entryLabel(0)).toBe("Budget Entry 1");
  expect(entryLabel(1)).toBe("Budget Entry 2");
});
