import { test, expect } from "vitest";
import { createBackupData } from "./backup-restore";
import { salary, allowance } from "@/fixtures/incomes";
import { electricity, water, gas } from "@/fixtures/expenses";
import { transportation, bills, personal } from "@/fixtures/expense-categories";

const incomes = [salary, allowance];
const expenses = [electricity, water, gas];
const incomeCategories = [transportation];
const expenseCategories = [bills, personal];

test("metadata contains correct version number and timestamp", () => {
  const { metadata } = createBackupData({
    incomes,
    expenses,
    incomeCategories,
    expenseCategories,
  });

  expect(metadata).toMatchObject({
    version: "0.1.0",
    exportedAt: expect.any(String),
  });
});

test("data section contains data in the correct format", () => {
  const { data } = createBackupData({
    incomes,
    expenses,
    incomeCategories,
    expenseCategories,
  });

  expect(data).toEqual({
    incomes,
    expenses,
    incomeCategories,
    expenseCategories,
  });
});
