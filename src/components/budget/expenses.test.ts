import { test, expect } from "vitest";
import {
  createExpenses,
  addExpense,
  updateExpense,
  removeExpense,
  canRemoveExpense,
  expenseLabel,
} from "./expenses";

test("creates a single zero expense by default", () => {
  const expenses = createExpenses();

  expect(expenses).toEqual([0]);
});

test("creates expenses based on the given values provided", () => {
  const expenses = createExpenses([100, 50, 75]);

  expect(expenses).toEqual([100, 50, 75]);
});

test("adds a new expense initialized to 0", () => {
  const expenses = [100, 50];
  const updatedExpenses = addExpense(expenses);

  expect(updatedExpenses).toEqual([100, 50, 0]);
});

test("updates the expense amount at the given index", () => {
  const expenses = [100, 50, 75];
  const updatedExpenses = updateExpense(expenses, 1, 200);

  expect(updatedExpenses).toEqual([100, 200, 75]);
});

test("throws error for invalid index when updating", () => {
  const expenses = [100, 50];

  expect(() => updateExpense(expenses, -1, 200)).toThrow();
  expect(() => updateExpense(expenses, 2, 200)).toThrow();
});

test("removes the expense at the given index", () => {
  const expenses = [100, 50, 75];
  const updatedExpenses = removeExpense(expenses, 1);

  expect(updatedExpenses).toEqual([100, 75]);
});

test("does not remove the last expense", () => {
  const expenses = [100];
  const updatedExpenses = removeExpense(expenses, 0);

  expect(updatedExpenses).toBe(expenses);
});

test("throws error for invalid index when removing", () => {
  const expenses = [100, 50];

  expect(() => removeExpense(expenses, -1)).toThrow();
  expect(() => removeExpense(expenses, 2)).toThrow();
});

test("can remove an expense when there are multiple expenses", () => {
  expect(canRemoveExpense([100, 50, 75])).toBe(true);
});

test("cannot remove the last expense", () => {
  expect(canRemoveExpense([100])).toBe(false);
});

test("formats the expense label based on the index", () => {
  expect(expenseLabel(0)).toBe("Expense 1");
  expect(expenseLabel(1)).toBe("Expense 2");
});
