import { test, expect, describe } from "vitest";
import { createBudget, createItemRecord } from "./budget";
import type { ItemRecord, CreateItemInput } from "./types";

const dummySection = { items: [], categories: [] };

test("item record is created with defaults for optional properties", () => {
  const record = createItemRecord({ id: "1", name: "Some item" });

  expect(record).toMatchObject({ amount: null, frequency: "monthly", category: "", notes: "" });
});

describe("item", () => {
  test("the normalized amount remains the same for monthly items", () => {
    const items = [createTestItemRecord({ amount: 400, frequency: "monthly" })];

    const { income } = createBudget({ items, categories: [] }, dummySection);

    expect(income.items[0].normalizedAmount).toBe(400);
  });

  test("normalized amount is halved for bi-monthly items", () => {
    const items = [createTestItemRecord({ amount: 400, frequency: "biMonthly" })];

    const { income } = createBudget({ items, categories: [] }, dummySection);

    expect(income.items[0].normalizedAmount).toBe(200); // 400/2
  });
});

describe("categories", () => {
  const employment = { id: "employment", name: "Employment" };
  const employmentItem1 = createTestItemRecord({ id: "e1", category: employment.id });
  const employmentItem2 = createTestItemRecord({ id: "e2", category: employment.id });

  test("items are grouped by category", () => {
    const freelance = { id: "freelance", name: "Freelance" };
    const freelanceItem = createTestItemRecord({ id: "f1", category: freelance.id });
    const items = [employmentItem1, freelanceItem, employmentItem2];
    const categories = [employment, freelance];

    const { income } = createBudget({ items, categories }, dummySection);

    expect(income.categories[0]).toMatchObject({
      id: employment.id,
      items: [employmentItem1, employmentItem2],
    });
  });

  test("a category without items is still included", () => {
    const categories = [employment];

    const { income } = createBudget({ items: [], categories }, dummySection);

    expect(income.categories[0]).toMatchObject({
      id: employment.id,
      items: [],
    });
  });

  test("a category total is the normalized sum of all its items", () => {
    const items = [
      createTestItemRecord({ id: "1", amount: 200, frequency: "monthly", category: employment.id }),
      createTestItemRecord({ id: "2", amount: 400, frequency: "biMonthly", category: employment.id }),
    ];
    const categories = [employment];

    const { income } = createBudget({ items, categories }, dummySection);

    expect(income.categories[0].total).toBe(400); // 200 + 400/2
  });

  test("items without a category are grouped as uncategorized", () => {
    const uncategorizedItem1 = createTestItemRecord({ id: "u1", category: "" });
    const uncategorizedItem2 = createTestItemRecord({ id: "u2", category: "" });
    const items = [uncategorizedItem1, employmentItem1, uncategorizedItem2];
    const categories = [employment];

    const { income } = createBudget({ items, categories }, dummySection);

    expect(income.uncategorized).toMatchObject({
      items: [uncategorizedItem1, uncategorizedItem2],
    });
  });

  test("the uncategorized total is the normalized sum of all its items", () => {
    const items = [
      createTestItemRecord({ id: "1", amount: 200, frequency: "monthly", category: "" }),
      createTestItemRecord({ id: "2", amount: 400, frequency: "biMonthly", category: "" }),
    ];

    const { income } = createBudget({ items, categories: [] }, dummySection);

    expect(income.uncategorized.total).toBe(400); // 200 + 400/2
  });
});

describe("section total", () => {
  test("total is zero when the section is empty", () => {
    const items: ItemRecord[] = [];

    const { income } = createBudget({ items, categories: [] }, dummySection);

    expect(income.total).toBe(0);
  });

  test("total is the normalized sum of all its items", () => {
    const items = [
      createTestItemRecord({ id: "1", amount: 400, frequency: "monthly" }),
      createTestItemRecord({ id: "2", amount: 400, frequency: "biMonthly" }),
    ];

    const { income } = createBudget({ items, categories: [] }, dummySection);

    expect(income.total).toBe(600); // 400 + 400/2
  });
});

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

function createTestItemRecord(input: Partial<CreateItemInput> = {}): ItemRecord {
  const id = input.id ?? "1";

  return createItemRecord({ id, name: id, ...input });
}
