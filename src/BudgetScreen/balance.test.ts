import { test, expect, describe } from "vitest";
import { createBudget } from "./budget";
import type { ItemRecord } from "./types";
import { createTestItemRecord } from "./test-utils";

describe("balance", () => {
  test("balanced when income and expenses are equal", () => {
    const incomeItems = [createTestItemRecord({ amount: 1000 })];
    const expenseItems = [createTestItemRecord({ amount: 1000 })];

    const { balance } = createBudget(
      { items: incomeItems, categories: [] },
      { items: expenseItems, categories: [] },
    );

    expect(balance.delta).toBe(0);
    expect(balance.status).toBe("balanced");
  });

  test("in surplus when income is greater than expenses", () => {
    const incomeItems = [createTestItemRecord({ amount: 1000 })];
    const expenseItems = [createTestItemRecord({ amount: 500 })];

    const { balance } = createBudget(
      { items: incomeItems, categories: [] },
      { items: expenseItems, categories: [] },
    );

    expect(balance.delta).toBe(500);
    expect(balance.status).toBe("surplus");
  });

  test("in deficit when expenses are greater than income", () => {
    const incomeItems = [createTestItemRecord({ amount: 500 })];
    const expenseItems = [createTestItemRecord({ amount: 1000 })];

    const { balance } = createBudget(
      { items: incomeItems, categories: [] },
      { items: expenseItems, categories: [] },
    );

    expect(balance.delta).toBe(-500);
    expect(balance.status).toBe("deficit");
  });
});

describe("section total", () => {
  const dummySection = { items: [], categories: [] };

  test("total is zero when section is empty", () => {
    const incomeItems: ItemRecord[] = [];

    const { income } = createBudget(
      { items: incomeItems, categories: [] },
      dummySection,
    );

    expect(income.total).toBe(0);
  });

  test("total is the normalized sum of all items", () => {
    const incomeItems = [
      createTestItemRecord({ id: "1", amount: 400, frequency: "monthly" }),
      createTestItemRecord({ id: "2", amount: 400, frequency: "biMonthly" }),
    ];

    const { income } = createBudget(
      { items: incomeItems, categories: [] },
      dummySection,
    );

    expect(income.total).toBe(600); // 400 + 400/2
  });
});
