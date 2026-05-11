import { expect, test } from "vitest";
import { createBudget } from "./budget";
import { createTestItemRecord, createTestItemRecords } from "./test-utils";

const dummySection = { items: [], categories: [] };

const employment = { id: "employment", name: "Employment" };
const passive = { id: "passive", name: "Passive" };

const employmentItem1 = createTestItemRecord({ id: "e1", categoryId: employment.id });
const employmentItem2 = createTestItemRecord({ id: "e2", categoryId: employment.id });

const passiveItem = createTestItemRecord({ id: "p1", categoryId: passive.id });

const uncategorizedItem1 = createTestItemRecord({ id: "u1", categoryId: null });
const uncategorizedItem2 = createTestItemRecord({ id: "u2", categoryId: null });

test("income and expense items appear in their own sections", () => {
  const incomeItems = [employmentItem1, employmentItem2];
  const expenseItems = [passiveItem];

  const { income, expenses } = createBudget(
    { items: incomeItems, categories: [] },
    { items: expenseItems, categories: [] },
  );

  expect(income.items).toMatchObject(incomeItems);
  expect(expenses.items).toMatchObject(expenseItems);
});

test.each([
  [employmentItem1, employmentItem2],
  [employmentItem1, passiveItem, uncategorizedItem1, employmentItem2],
])(
  "items are grouped by category regardless of the items order",
  (...items) => {
    const { income: { categories } } = createBudget({ items, categories: [employment] }, dummySection);

    expect(categories[0]).toMatchObject({
      items: [employmentItem1, employmentItem2],
    });
  },
);

test.each([
  [employment, passive],
  [passive, employment],
])(
  "items are grouped by category regardless of the categories order",
  (...categories) => {
    const index = categories.indexOf(employment);

    const { income } = createBudget({ items: [employmentItem1, passiveItem], categories }, dummySection);

    expect(income.categories[index]).toMatchObject({
      items: [employmentItem1],
    });
  },
);

test.each([
  [uncategorizedItem1, uncategorizedItem2],
  [uncategorizedItem1, employmentItem1, uncategorizedItem2],
])(
  "items without a category are listed as uncategorized",
  (...items) => {
    const { income } = createBudget({ items, categories: [employment] }, dummySection);

    expect(income.uncategorized).toMatchObject({
      items: [uncategorizedItem1, uncategorizedItem2],
    });
  },
);

test("a category with no matching items has no items", () => {
  const { income: { categories } } = createBudget({ items: [employmentItem1], categories: [employment, passive] }, dummySection);

  expect(categories[1]).toMatchObject({
    items: [],
  });
});

test("a category total is the sum of its normalized item amounts", () => {
  const items = createTestItemRecords([
    { amount: 200, frequency: "monthly", categoryId: employment.id },
    { amount: 400, frequency: "biMonthly", categoryId: employment.id },
  ]);

  const { income: { categories } } = createBudget({ items, categories: [employment] }, dummySection);

  expect(categories[0].total).toBe(400); // 200 + 400/2
});

test("the uncategorized total is the sum of its normalized item amounts", () => {
  const items = createTestItemRecords([
    { amount: 200, frequency: "monthly", categoryId: null },
    { amount: 400, frequency: "biMonthly", categoryId: null },
  ]);

  const { income } = createBudget({ items, categories: [employment] }, dummySection);

  expect(income.uncategorized.total).toBe(400); // 200 + 400/2
});
