import { expect, test } from "vitest";
import { createCategory, updateCategory, sumCategoryItems } from "./categories";
import { createTestItems } from "@/fixtures/test-utils";

test("creates a category with the given id and name", () => {
  const category = createCategory("1", "Test Category");

  expect(category).toEqual({
    id: "1",
    name: "Test Category",
  });
});

test("throws an error if creating a category with an empty id", () => {
  expect(() => createCategory("", "Test Category")).toThrow("Id is required");
});

test("throws an error if creating a category with an empty name", () => {
  expect(() => createCategory("1", "")).toThrow("Name is required");
});

test("updates a category with the given name", () => {
  const category = createCategory("1", "Test Category");

  const updatedCategory = updateCategory(category, "Updated Category");

  expect(updatedCategory).toEqual({
    id: "1",
    name: "Updated Category",
  });
});

test("throws an error if updating a category with an empty name", () => {
  const category = createCategory("1", "Test Category");

  expect(() => updateCategory(category, "")).toThrow("Name is required");
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
