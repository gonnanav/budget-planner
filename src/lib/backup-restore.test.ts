import { test, expect } from "vitest";
import { createBackupData } from "./backup-restore";
import { salary, allowance } from "fixtures/incomes";
import { electricity, water, gas } from "fixtures/expenses";
import { transportation, bills, personal } from "fixtures/expense-categories";

const incomeItems = [salary, allowance];
const expenseItems = [electricity, water, gas];
const incomeCategories = [transportation];
const expenseCategories = [bills, personal];

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
