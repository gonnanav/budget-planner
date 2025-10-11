import { expect, test } from "vitest";
import { createCategory, updateCategory } from "./categories";

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
