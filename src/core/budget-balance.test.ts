import { test, expect } from "vitest";
import {
  budgetBalance,
  budgetItemsSum,
  normalizeAmount,
  calculateCategoryTotal,
} from "./budget-balance";
import { createTestItems, createTestItem } from "@/fixtures/test-utils";

test("balance is balanced when incomes and expenses are equal", () => {
  const { balance, status } = budgetBalance(
    createTestItems([{ amount: 1000 }]),
    createTestItems([{ amount: 1000 }]),
  );

  expect(balance).toBe(0);
  expect(status).toBe("balanced");
});

test("balance is positive when incomes are greater than expenses", () => {
  const { balance, status } = budgetBalance(
    createTestItems([{ amount: 1000 }]),
    createTestItems([{ amount: 500 }]),
  );

  expect(balance).toBe(500);
  expect(status).toBe("positive");
});

test("balance is negative when expenses are greater than incomes", () => {
  const { balance, status } = budgetBalance(
    createTestItems([{ amount: 500 }]),
    createTestItems([{ amount: 1000 }]),
  );

  expect(balance).toBe(-500);
  expect(status).toBe("negative");
});

test("no income is counted as zero", () => {
  const { balance } = budgetBalance([], createTestItems([{ amount: 1000 }]));

  expect(balance).toBe(-1000);
});

test("multiple incomes are summed up", () => {
  const { balance } = budgetBalance(
    createTestItems([{ amount: 400 }, { amount: 600 }]),
    createTestItems([{ amount: 500 }]),
  );

  expect(balance).toBe(500);
});

test("no expense is counted as zero", () => {
  const { balance } = budgetBalance(createTestItems([{ amount: 1000 }]), []);

  expect(balance).toBe(1000);
});

test("multiple expenses are summed up", () => {
  const { balance } = budgetBalance(
    createTestItems([{ amount: 1000 }]),
    createTestItems([{ amount: 300 }, { amount: 200 }]),
  );

  expect(balance).toBe(500);
});

test("items with different frequencies are summed up", () => {
  const sum = budgetItemsSum(
    createTestItems([
      { amount: 1000, frequency: "biMonthly" },
      { amount: 300, frequency: "monthly" },
    ]),
  );

  expect(sum).toBe(800);
});

test("monthly items are not divided", () => {
  const sum = normalizeAmount(
    createTestItem({ amount: 1000, frequency: "monthly" }),
  );

  expect(sum).toBe(1000);
});

test("biMonthly items are divided by 2", () => {
  const sum = normalizeAmount(
    createTestItem({ amount: 1000, frequency: "biMonthly" }),
  );

  expect(sum).toBe(500);
});

test("items for a specific category are summed up", () => {
  const items = createTestItems([
    { amount: 200, frequency: "monthly", categoryId: "transportation" },
    { amount: 400, frequency: "biMonthly", categoryId: "transportation" },
    { amount: 150, frequency: "monthly", categoryId: "entertainment" },
    { amount: 300, frequency: "monthly", categoryId: "transportation" },
  ]);

  const transportationTotal = calculateCategoryTotal("transportation", items);
  const entertainmentTotal = calculateCategoryTotal("entertainment", items);
  const emptyTotal = calculateCategoryTotal("nonexistent", items);

  expect(transportationTotal).toBe(700); // 200 + 400/2 + 300 = 700
  expect(entertainmentTotal).toBe(150); // 150
  expect(emptyTotal).toBe(0); // No items for this category
});
