import { test, expect } from "vitest";
import { budgetBalance } from "./budget-balance";
import { createEntry } from "./budget-entries";

test("balance is balanced when incomes and expenses are equal", () => {
  const { balance, status } = budgetBalance(
    [createEntry("1", { amount: 1000 })],
    [createEntry("2", { amount: 1000 })],
  );

  expect(balance).toBe(0);
  expect(status).toBe("balanced");
});

test("balance is positive when incomes are greater than expenses", () => {
  const { balance, status } = budgetBalance(
    [createEntry("1", { amount: 1000 })],
    [createEntry("2", { amount: 500 })],
  );

  expect(balance).toBe(500);
  expect(status).toBe("positive");
});

test("balance is negative when expenses are greater than incomes", () => {
  const { balance, status } = budgetBalance(
    [createEntry("1", { amount: 500 })],
    [createEntry("2", { amount: 1000 })],
  );

  expect(balance).toBe(-500);
  expect(status).toBe("negative");
});

test("no income is counted as zero", () => {
  const { balance } = budgetBalance([], [createEntry("1", { amount: 1000 })]);

  expect(balance).toBe(-1000);
});

test("multiple incomes are summed up", () => {
  const { balance } = budgetBalance(
    [createEntry("1", { amount: 400 }), createEntry("2", { amount: 600 })],
    [createEntry("3", { amount: 500 })],
  );

  expect(balance).toBe(500);
});

test("no expense is counted as zero", () => {
  const { balance } = budgetBalance([createEntry("1", { amount: 1000 })], []);

  expect(balance).toBe(1000);
});

test("multiple expenses are summed up", () => {
  const { balance } = budgetBalance(
    [createEntry("1", { amount: 1000 })],
    [createEntry("2", { amount: 300 }), createEntry("3", { amount: 200 })],
  );

  expect(balance).toBe(500);
});
