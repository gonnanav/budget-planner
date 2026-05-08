import { test, expect } from "vitest";
import { createItem } from "./budget";

test("creates an item based on the given input", () => {
  const item = createItem({
    id: "1",
    name: "Some item",
    amount: 100,
    frequency: "biMonthly",
    categoryId: "category-1",
    section: "income",
  });

  expect(item).toMatchObject({
    id: "1",
    name: "Some item",
    amount: 100,
    frequency: "biMonthly",
    categoryId: "category-1",
  });
});

test("creates an item with defaults for optional input properties", () => {
  const item = createItem({ id: "1", name: "Some item", section: "income" });

  expect(item).toMatchObject({ amount: null, frequency: "monthly" });
});
