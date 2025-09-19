import { test, expect } from "vitest";
import {
  createBudgetEntries,
  createBudgetEntry,
  addBudgetEntry,
  updateBudgetEntry,
  removeBudgetEntry,
  makeLabel,
} from "./budget-entries";

test("creates a budget entry with the given amount", () => {
  const budgetEntry = createBudgetEntry(100);

  expect(budgetEntry).toEqual({ amount: 100 });
});

test("creates a budget entry with zero amount when null is provided", () => {
  const budgetEntry = createBudgetEntry(null);

  expect(budgetEntry).toEqual({ amount: 0 });
});

test("creates a budget entry with zero amount when undefined is provided", () => {
  const budgetEntry = createBudgetEntry(undefined);

  expect(budgetEntry).toEqual({ amount: 0 });
});

test("creates a budget entry with zero amount when no amount is provided", () => {
  const budgetEntry = createBudgetEntry();

  expect(budgetEntry).toEqual({ amount: 0 });
});

test("creates an empty array of budget entries by default", () => {
  const budgetEntries = createBudgetEntries();

  expect(budgetEntries).toEqual([]);
});

test("creates budget entries based on the given values provided", () => {
  const budgetEntries = createBudgetEntries([
    createBudgetEntry(100),
    createBudgetEntry(50),
    createBudgetEntry(75),
  ]);

  expect(budgetEntries).toEqual([
    createBudgetEntry(100),
    createBudgetEntry(50),
    createBudgetEntry(75),
  ]);
});

test("adds a new budget entry with the given amount", () => {
  const budgetEntries = [createBudgetEntry(100), createBudgetEntry(50)];
  const updatedBudgetEntries = addBudgetEntry(budgetEntries, 200);

  expect(updatedBudgetEntries).toEqual([
    createBudgetEntry(100),
    createBudgetEntry(50),
    createBudgetEntry(200),
  ]);
});

test("updates the budget entry amount at the given index", () => {
  const budgetEntries = [
    createBudgetEntry(100),
    createBudgetEntry(50),
    createBudgetEntry(75),
  ];
  const updatedBudgetEntries = updateBudgetEntry(
    budgetEntries,
    1,
    createBudgetEntry(200),
  );

  expect(updatedBudgetEntries).toEqual([
    createBudgetEntry(100),
    createBudgetEntry(200),
    createBudgetEntry(75),
  ]);
});

test("throws error for invalid index when updating", () => {
  const budgetEntries = [createBudgetEntry(100), createBudgetEntry(50)];

  expect(() =>
    updateBudgetEntry(budgetEntries, -1, createBudgetEntry(200)),
  ).toThrow();
  expect(() =>
    updateBudgetEntry(budgetEntries, 2, createBudgetEntry(200)),
  ).toThrow();
});

test("removes the budget entry at the given index", () => {
  const budgetEntries = [
    createBudgetEntry(100),
    createBudgetEntry(50),
    createBudgetEntry(75),
  ];
  const updatedBudgetEntries = removeBudgetEntry(budgetEntries, 1);

  expect(updatedBudgetEntries).toEqual([
    createBudgetEntry(100),
    createBudgetEntry(75),
  ]);
});

test("throws error for invalid index when removing", () => {
  const budgetEntries = [createBudgetEntry(100), createBudgetEntry(50)];

  expect(() => removeBudgetEntry(budgetEntries, -1)).toThrow();
  expect(() => removeBudgetEntry(budgetEntries, 2)).toThrow();
});

test("formats the budget entry label", () => {
  const entryLabel = makeLabel("Budget Entry");
  expect(entryLabel(0)).toBe("Budget Entry 1");
  expect(entryLabel(1)).toBe("Budget Entry 2");
});
