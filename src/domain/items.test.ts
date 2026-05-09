import { test, expect } from "vitest";
import { createItem, createItemRecord } from "./budget";

test("creates an item based on the given record", () => {
  const item = createItem({
    id: "1",
    name: "Some item",
    amount: 100,
    frequency: "biMonthly",
    categoryId: "category-1",
  });

  expect(item).toMatchObject({
    id: "1",
    name: "Some item",
    amount: 100,
    frequency: "biMonthly",
    categoryId: "category-1",
  });
});

test("creates an item record with defaults for optional input properties", () => {
  const record = createItemRecord({ id: "1", name: "Some item" });

  expect(record).toMatchObject({ amount: null, frequency: "monthly" });
});
