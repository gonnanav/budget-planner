import { test, expect } from "vitest";
import {
  budgetBalance,
  budgetEntriesSum,
  normalizeAmount,
} from "./budget-balance";
import { createTestEntries, createTestEntry } from "./test-utils";

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

test("entries with different frequencies are summed up", () => {
  const sum = budgetEntriesSum(
    createTestEntries([
      { amount: 1000, frequency: "biMonthly" },
      { amount: 300, frequency: "monthly" },
    ]),
  );

  expect(sum).toBe(800);
});

test("monthly entries are not divided", () => {
  const sum = normalizeAmount(
    createTestEntry({ amount: 1000, frequency: "monthly" }),
  );

  expect(sum).toBe(1000);
});

test("biMonthly entries are divided by 2", () => {
  const sum = normalizeAmount(
    createTestEntry({ amount: 1000, frequency: "biMonthly" }),
  );

  expect(sum).toBe(500);
});
