import { expect, test } from "vitest";
import { createSectionState } from "./budget";
import { createTestItem, createTestItems } from "fixtures/utils";
import { employment, passive } from "fixtures/incomeCategories";

const employmentItem1 = createTestItem({ id: "e1", categoryId: employment.id });
const employmentItem2 = createTestItem({ id: "e2", categoryId: employment.id });

const passiveItem = createTestItem({ id: "p1", categoryId: passive.id });

const uncategorizedItem1 = createTestItem({ id: "u1", categoryId: null });
const uncategorizedItem2 = createTestItem({ id: "u2", categoryId: null });

test("includes the provided items and categories as-is", () => {
  const items = [employmentItem1, employmentItem2, passiveItem];
  const categories = [employment, passive];

  const state = createSectionState(items, categories);

  expect(state.items).toBe(items);
  expect(state.categories).toBe(categories);
});

test.each([[], [employmentItem1], [employmentItem1, employmentItem2]])(
  "there are no category groups when there are no categories",
  (...items) => {
    const { groups } = createSectionState(items, []);

    expect(groups).toEqual([]);
  },
);

test.each([
  [employmentItem1, employmentItem2],
  [employmentItem1, passiveItem, uncategorizedItem1, employmentItem2],
])(
  "items are grouped by category regardless of the items order",
  (...items) => {
    const { groups } = createSectionState(items, [employment]);
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

    const { groups } = createSectionState([employmentItem1, passiveItem], categories);
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
    const { groups } = createSectionState(items, [employment]);
    const uncategorizedGroup = groups[1];

    expect(uncategorizedGroup).toMatchObject({
      kind: "uncategorized",
      items: [uncategorizedItem1, uncategorizedItem2],
    });
  },
);

test("a category with no items has an empty group", () => {
  const { groups } = createSectionState([employmentItem1], [employment, passive]);
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

  const { groups } = createSectionState(items, [employment]);
  const employmentGroup = groups[0];

  expect(employmentGroup.total).toBe(400); // 200 + 400/2
});

test("an uncategorized group total is the sum of its items", () => {
  const items = createTestItems([
    { amount: 200, frequency: "monthly", categoryId: null },
    { amount: 400, frequency: "biMonthly", categoryId: null },
  ]);

  const { groups } = createSectionState(items, [employment]);
  const uncategorizedGroup = groups[1];

  expect(uncategorizedGroup.total).toBe(400); // 200 + 400/2
});
