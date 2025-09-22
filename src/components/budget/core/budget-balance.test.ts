import { test, expect } from "vitest";
import { budgetBalance } from "./budget-balance";
import { createTestEntries } from "./test-utils";

test("balance is balanced when incomes and expenses are equal", () => {
  const { balance, status } = budgetBalance(
    createTestEntries([{ amount: 1000 }]),
    createTestEntries([{ amount: 1000 }]),
  );

  expect(balance).toBe(0);
  expect(status).toBe("balanced");
});

test("balance is positive when incomes are greater than expenses", () => {
  const { balance, status } = budgetBalance(
    createTestEntries([{ amount: 1000 }]),
    createTestEntries([{ amount: 500 }]),
  );

  expect(balance).toBe(500);
  expect(status).toBe("positive");
});

test("balance is negative when expenses are greater than incomes", () => {
  const { balance, status } = budgetBalance(
    createTestEntries([{ amount: 500 }]),
    createTestEntries([{ amount: 1000 }]),
  );

  expect(balance).toBe(-500);
  expect(status).toBe("negative");
});

test("no income is counted as zero", () => {
  const { balance } = budgetBalance([], createTestEntries([{ amount: 1000 }]));

  expect(balance).toBe(-1000);
});

test("multiple incomes are summed up", () => {
  const { balance } = budgetBalance(
    createTestEntries([{ amount: 400 }, { amount: 600 }]),
    createTestEntries([{ amount: 500 }]),
  );

  expect(balance).toBe(500);
});

test("no expense is counted as zero", () => {
  const { balance } = budgetBalance(createTestEntries([{ amount: 1000 }]), []);

  expect(balance).toBe(1000);
});

test("multiple expenses are summed up", () => {
  const { balance } = budgetBalance(
    createTestEntries([{ amount: 1000 }]),
    createTestEntries([{ amount: 300 }, { amount: 200 }]),
  );

  expect(balance).toBe(500);
});
