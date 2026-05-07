import { test, expect } from "vitest";
import { createBackupData } from "./backup";

const emptyInput = {
  incomeItems: [],
  expenseItems: [],
  incomeCategories: [],
  expenseCategories: [],
};

test("metadata contains correct version number and timestamp", () => {
  const { metadata } = createBackupData(emptyInput);

  expect(metadata).toMatchObject({
    version: "0.2.0",
    exportedAt: expect.any(String),
  });
});

test("data section contains data in the correct format", () => {
  const { data } = createBackupData(emptyInput);

  expect(data).toEqual({
    incomeItems: [],
    expenseItems: [],
    incomeCategories: [],
    expenseCategories: [],
  });
});
