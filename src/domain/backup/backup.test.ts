import { test, expect } from "vitest";
import { createBackupData } from "./backup";
import { incomeItems } from "fixtures/incomes";
import { expenseItems } from "fixtures/expenses";
import { incomeCategories } from "fixtures/income-categories";
import { expenseCategories } from "fixtures/expense-categories";

test("metadata contains correct version number and timestamp", () => {
  const { metadata } = createBackupData({
    incomeItems,
    expenseItems,
    incomeCategories,
    expenseCategories,
  });

  expect(metadata).toMatchObject({
    version: "0.2.0",
    exportedAt: expect.any(String),
  });
});

test("data section contains data in the correct format", () => {
  const { data } = createBackupData({
    incomeItems,
    expenseItems,
    incomeCategories,
    expenseCategories,
  });

  expect(data).toEqual({
    incomeItems,
    expenseItems,
    incomeCategories,
    expenseCategories,
  });
});
