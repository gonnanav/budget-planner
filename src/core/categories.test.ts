import { expect, test } from "vitest";
import { createCategory, sumCategoryItems } from "./categories";
import { createTestItems } from "fixtures/test-utils";

test("creates a category with the given id and name", () => {
  const category = createCategory({
    id: "1",
    name: "Test Category",
    section: "expenses",
  });

  expect(category).toEqual({
    id: "1",
    name: "Test Category",
    section: "expenses",
  });
});

test("throws an error if creating a category with an empty id", () => {
  expect(() =>
    createCategory({ id: "", name: "Test Category", section: "expenses" }),
  ).toThrow("Id is required");
});

test("throws an error if creating a category with an empty name", () => {
  expect(() =>
    createCategory({ id: "1", name: "", section: "expenses" }),
  ).toThrow("Name is required");
});

test("items for a specific category are summed up", () => {
  const items = createTestItems([
    { amount: 200, frequency: "monthly", categoryId: "transportation" },
    { amount: 400, frequency: "biMonthly", categoryId: "transportation" },
    { amount: 150, frequency: "monthly", categoryId: "entertainment" },
    { amount: 300, frequency: "monthly", categoryId: "transportation" },
  ]);

  const transportationTotal = sumCategoryItems("transportation", items);
  const entertainmentTotal = sumCategoryItems("entertainment", items);
  const emptyTotal = sumCategoryItems("nonexistent", items);

  expect(transportationTotal).toBe(700); // 200 + 400/2 + 300 = 700
  expect(entertainmentTotal).toBe(150); // 150
  expect(emptyTotal).toBe(0); // No items for this category
});
