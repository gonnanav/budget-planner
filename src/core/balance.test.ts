import { test, expect } from "vitest";
import {
  calculateBalance,
  normalizeAmount,
  calculateCategoryTotal,
} from "./balance";
import { createTestItems, createTestItem } from "@/fixtures/test-utils";

test("budget is balanced when incomes and expenses are equal", () => {
  const { balance, status } = calculateBalance(
    createTestItems([{ amount: 1000 }]),
    createTestItems([{ amount: 1000 }]),
  );

  expect(balance).toBe(0);
  expect(status).toBe("balanced");
});

test("budget is in surplus when incomes are greater than expenses", () => {
  const { balance, status } = calculateBalance(
    createTestItems([{ amount: 1000 }]),
    createTestItems([{ amount: 500 }]),
  );

  expect(balance).toBe(500);
  expect(status).toBe("surplus");
});

test("budget is in deficit when expenses are greater than incomes", () => {
  const { balance, status } = calculateBalance(
    createTestItems([{ amount: 500 }]),
    createTestItems([{ amount: 1000 }]),
  );

  expect(balance).toBe(-500);
  expect(status).toBe("deficit");
});

test("no income is counted as zero", () => {
  const { balance } = calculateBalance([], createTestItems([{ amount: 1000 }]));

  expect(balance).toBe(-1000);
});

test("multiple incomes are summed up", () => {
  const { balance } = calculateBalance(
    createTestItems([{ amount: 400 }, { amount: 600 }]),
    createTestItems([{ amount: 500 }]),
  );

  expect(balance).toBe(500);
});

test("no expense is counted as zero", () => {
  const { balance } = calculateBalance(createTestItems([{ amount: 1000 }]), []);

  expect(balance).toBe(1000);
});

test("multiple expenses are summed up", () => {
  const { balance } = calculateBalance(
    createTestItems([{ amount: 1000 }]),
    createTestItems([{ amount: 300 }, { amount: 200 }]),
  );

  expect(balance).toBe(500);
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
