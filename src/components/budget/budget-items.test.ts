import { test, expect } from "vitest";
import {
  createBudgetItems,
  addBudgetItem,
  updateBudgetItem,
  removeBudgetItem,
  canRemoveBudgetItem,
  makeLabel,
} from "./budget-items";

test("creates a single zero budget item by default", () => {
  const budgetItems = createBudgetItems();

  expect(budgetItems).toEqual([0]);
});

test("creates budget items based on the given values provided", () => {
  const budgetItems = createBudgetItems([100, 50, 75]);

  expect(budgetItems).toEqual([100, 50, 75]);
});

test("adds a new budget item initialized to 0", () => {
  const budgetItems = [100, 50];
  const updatedBudgetItems = addBudgetItem(budgetItems);

  expect(updatedBudgetItems).toEqual([100, 50, 0]);
});

test("updates the budget item amount at the given index", () => {
  const budgetItems = [100, 50, 75];
  const updatedBudgetItems = updateBudgetItem(budgetItems, 1, 200);

  expect(updatedBudgetItems).toEqual([100, 200, 75]);
});

test("throws error for invalid index when updating", () => {
  const budgetItems = [100, 50];

  expect(() => updateBudgetItem(budgetItems, -1, 200)).toThrow();
  expect(() => updateBudgetItem(budgetItems, 2, 200)).toThrow();
});

test("removes the budget item at the given index", () => {
  const budgetItems = [100, 50, 75];
  const updatedBudgetItems = removeBudgetItem(budgetItems, 1);

  expect(updatedBudgetItems).toEqual([100, 75]);
});

test("does not remove the last budget item", () => {
  const budgetItems = [100];
  const updatedBudgetItems = removeBudgetItem(budgetItems, 0);

  expect(updatedBudgetItems).toBe(budgetItems);
});

test("throws error for invalid index when removing", () => {
  const budgetItems = [100, 50];

  expect(() => removeBudgetItem(budgetItems, -1)).toThrow();
  expect(() => removeBudgetItem(budgetItems, 2)).toThrow();
});

test("can remove a budget item when there are multiple budget items", () => {
  expect(canRemoveBudgetItem([100, 50, 75])).toBe(true);
});

test("cannot remove the last budget item", () => {
  expect(canRemoveBudgetItem([100])).toBe(false);
});

test("formats the budget item label", () => {
  const itemLabel = makeLabel("Budget Item");
  expect(itemLabel(0)).toBe("Budget Item 1");
  expect(itemLabel(1)).toBe("Budget Item 2");
});
