import { test, expect } from "vitest";
import { budgetBalance } from "./budget-balance";
import { createBudgetEntry } from "./budget-entries";

test("balance is balanced when incomes and expenses are equal", () => {
  const { balance, status } = budgetBalance(
    [createBudgetEntry(1000)],
    [createBudgetEntry(1000)],
  );

  expect(balance).toBe(0);
  expect(status).toBe("balanced");
});

test("balance is positive when incomes are greater than expenses", () => {
  const { balance, status } = budgetBalance(
    [createBudgetEntry(1000)],
    [createBudgetEntry(500)],
  );

  expect(balance).toBe(500);
  expect(status).toBe("positive");
});

test("balance is negative when expenses are greater than incomes", () => {
  const { balance, status } = budgetBalance(
    [createBudgetEntry(500)],
    [createBudgetEntry(1000)],
  );

  expect(balance).toBe(-500);
  expect(status).toBe("negative");
});

test("no income is counted as zero", () => {
  const { balance } = budgetBalance([], [createBudgetEntry(1000)]);

  expect(balance).toBe(-1000);
});

test("empty income is counted as zero", () => {
  const { balance } = budgetBalance(
    [createBudgetEntry(null)],
    [{ amount: 1000 }],
  );
  expect(balance).toBe(-1000);
});

test("multiple incomes are summed up", () => {
  const { balance } = budgetBalance(
    [createBudgetEntry(400), createBudgetEntry(600)],
    [createBudgetEntry(500)],
  );

  expect(balance).toBe(500);
});

test("no expense is counted as zero", () => {
  const { balance } = budgetBalance([createBudgetEntry(1000)], []);

  expect(balance).toBe(1000);
});

test("empty expense is counted as zero", () => {
  const { balance } = budgetBalance(
    [{ amount: 1000 }],
    [createBudgetEntry(null)],
  );

  expect(balance).toBe(1000);
});

test("multiple expenses are summed up", () => {
  const { balance } = budgetBalance(
    [createBudgetEntry(1000)],
    [createBudgetEntry(300), createBudgetEntry(200)],
  );

  expect(balance).toBe(500);
});
