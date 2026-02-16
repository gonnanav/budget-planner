import { test, expect } from "vitest";
import { createItem } from "./items";

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

test("throws error for creating an item without a name", () => {
  expect(() =>
    createItem({ id: "1", name: "", amount: 100, section: "income" }),
  ).toThrow();
});

test("throws error for creating an item with an invalid amount", () => {
  expect(() =>
    createItem({ id: "1", name: "Some item", amount: -1, section: "income" }),
  ).toThrow();
});
