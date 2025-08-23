import { test, expect } from "vitest";
import {
  createBudgetEntries,
  addBudgetEntry,
  updateBudgetEntry,
  removeBudgetEntry,
  canRemoveBudgetEntry,
  makeLabel,
} from "./budget-entries";

test("creates a single zero budget entry by default", () => {
  const budgetEntries = createBudgetEntries();

  expect(budgetEntries).toEqual([0]);
});

test("creates budget entries based on the given values provided", () => {
  const budgetEntries = createBudgetEntries([100, 50, 75]);

  expect(budgetEntries).toEqual([100, 50, 75]);
});

test("adds a new budget entry initialized to 0", () => {
  const budgetEntries = [100, 50];
  const updatedBudgetEntries = addBudgetEntry(budgetEntries);

  expect(updatedBudgetEntries).toEqual([100, 50, 0]);
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

test("does not remove the last budget entry", () => {
  const budgetEntries = [100];
  const updatedBudgetEntries = removeBudgetEntry(budgetEntries, 0);

  expect(updatedBudgetEntries).toBe(budgetEntries);
});

test("throws error for invalid index when removing", () => {
  const budgetEntries = [100, 50];

  expect(() => removeBudgetEntry(budgetEntries, -1)).toThrow();
  expect(() => removeBudgetEntry(budgetEntries, 2)).toThrow();
});

test("can remove a budget entry when there are multiple budget entries", () => {
  expect(canRemoveBudgetEntry([100, 50, 75])).toBe(true);
});

test("cannot remove the last budget entry", () => {
  expect(canRemoveBudgetEntry([100])).toBe(false);
});

test("formats the budget entry label", () => {
  const entryLabel = makeLabel("Budget Entry");
  expect(entryLabel(0)).toBe("Budget Entry 1");
  expect(entryLabel(1)).toBe("Budget Entry 2");
});
