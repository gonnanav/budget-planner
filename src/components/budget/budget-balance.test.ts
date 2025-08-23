import { test, expect } from "vitest";
import { budgetBalance } from "./budget-balance";

test("balance is balanced when incomes and expenses are equal", () => {
  const { balance, status } = budgetBalance([1000], [1000]);

  expect(balance).toBe(0);
  expect(status).toBe("balanced");
});

test("balance is positive when incomes are greater than expenses", () => {
  const { balance, status } = budgetBalance([1000], [500]);

  expect(balance).toBe(500);
  expect(status).toBe("positive");
});

test("balance is negative when expenses are greater than incomes", () => {
  const { balance, status } = budgetBalance([500], [1000]);

  expect(balance).toBe(-500);
  expect(status).toBe("negative");
});

test("no income is counted as zero", () => {
  const { balance } = budgetBalance([], [1000]);

  expect(balance).toBe(-1000);
});

test("empty income is counted as zero", () => {
  const { balance } = budgetBalance([null], [1000]);
  expect(balance).toBe(-1000);
});

test("multiple incomes are summed up", () => {
  const { balance } = budgetBalance([400, 600], [500]);

  expect(balance).toBe(500);
});

test("no expense is counted as zero", () => {
  const { balance } = budgetBalance([1000], []);

  expect(balance).toBe(1000);
});

test("empty expense is counted as zero", () => {
  const { balance } = budgetBalance([1000], [null]);

  expect(balance).toBe(1000);
});

test("multiple expenses are summed up", () => {
  const { balance } = budgetBalance([1000], [300, 200]);

  expect(balance).toBe(500);
});
