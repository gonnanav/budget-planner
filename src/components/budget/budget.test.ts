import { test, expect } from "vitest";
import { evaluateBudget } from "./budget";

test("balance is balanced when incomes and expenses are equal", () => {
  const { balance, status } = evaluateBudget(1000, [1000]);

  expect(balance).toBe(0);
  expect(status).toBe("balanced");
});

test("balance is positive when incomes are greater than expenses", () => {
  const { balance, status } = evaluateBudget(1000, [500]);

  expect(balance).toBe(500);
  expect(status).toBe("positive");
});

test("balance is negative when expenses are greater than incomes", () => {
  const { balance, status } = evaluateBudget(500, [1000]);

  expect(balance).toBe(-500);
  expect(status).toBe("negative");
});

test("empty expenses are counted as zero", () => {
  const { balance } = evaluateBudget(1000, []);

  expect(balance).toBe(1000);
});

test("multiple expenses are summed up", () => {
  const { balance } = evaluateBudget(1000, [300, 200]);

  expect(balance).toBe(500);
});
