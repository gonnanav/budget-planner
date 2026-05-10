import { expect, test } from "vitest";
import { createBudget } from "@/domain/budget";
import { createTestItem, createTestItems } from "@/test-utils";

const emptySection = { items: [], categories: [] };

const employment = { id: "employment", name: "Employment" };
const passive = { id: "passive", name: "Passive" };

const employmentItem1 = createTestItem({ id: "e1", categoryId: employment.id });
const employmentItem2 = createTestItem({ id: "e2", categoryId: employment.id });

const passiveItem = createTestItem({ id: "p1", categoryId: passive.id });

const uncategorizedItem1 = createTestItem({ id: "u1", categoryId: null });
const uncategorizedItem2 = createTestItem({ id: "u2", categoryId: null });

test("includes the provided items and categories as-is", () => {
  const items = [employmentItem1, employmentItem2, passiveItem];
  const categories = [employment, passive];

  const { income } = createBudget({ items, categories }, emptySection);

  expect(income.items).toEqual(items);
  expect(income.categories).toBe(categories);
});

test.each([[], [employmentItem1], [employmentItem1, employmentItem2]])(
  "there are no category groups when there are no categories",
  (...items) => {
    const { income: { groups } } = createBudget({ items, categories: [] }, emptySection);

    expect(groups).toEqual([]);
  },
);

test.each([
  [employmentItem1, employmentItem2],
  [employmentItem1, passiveItem, uncategorizedItem1, employmentItem2],
])(
  "items are grouped by category regardless of the items order",
  (...items) => {
    const { income: { groups } } = createBudget({ items, categories: [employment] }, emptySection);
    const employmentGroup = groups[0];

    expect(employmentGroup).toMatchObject({
      kind: "categorized",
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

    const { income: { groups } } = createBudget({ items: [employmentItem1, passiveItem], categories }, emptySection);
    const employmentGroup = groups[index];

    expect(employmentGroup).toMatchObject({
      kind: "categorized",
      items: [employmentItem1],
    });
  },
);

test.each([
  [uncategorizedItem1, uncategorizedItem2],
  [uncategorizedItem1, employmentItem1, uncategorizedItem2],
])(
  "items without a category are grouped as uncategorized at the end",
  (...items) => {
    const { income: { groups } } = createBudget({ items, categories: [employment] }, emptySection);
    const uncategorizedGroup = groups[1];

    expect(uncategorizedGroup).toMatchObject({
      kind: "uncategorized",
      items: [uncategorizedItem1, uncategorizedItem2],
    });
  },
);

test("a category with no items has an empty group", () => {
  const { income: { groups } } = createBudget({ items: [employmentItem1], categories: [employment, passive] }, emptySection);
  const passiveGroup = groups[1];

  expect(passiveGroup).toMatchObject({
    kind: "categorized",
    items: [],
  });
});

test("a categorized group total is the sum of its items", () => {
  const items = createTestItems([
    { amount: 200, frequency: "monthly", categoryId: employment.id },
    { amount: 400, frequency: "biMonthly", categoryId: employment.id },
  ]);

  const { income: { groups } } = createBudget({ items, categories: [employment] }, emptySection);
  const employmentGroup = groups[0];

  expect(employmentGroup.total).toBe(400); // 200 + 400/2
});

test("an uncategorized group total is the sum of its items", () => {
  const items = createTestItems([
    { amount: 200, frequency: "monthly", categoryId: null },
    { amount: 400, frequency: "biMonthly", categoryId: null },
  ]);

  const { income: { groups } } = createBudget({ items, categories: [employment] }, emptySection);
  const uncategorizedGroup = groups[1];

  expect(uncategorizedGroup.total).toBe(400); // 200 + 400/2
});
