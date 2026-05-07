import { expect, test } from "vitest";
import { createCategory } from "./categories";

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
