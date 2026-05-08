import { expect, test } from "vitest";
import { createCategory } from "./budget";

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
