import { test, expect } from "vitest";
import { createExportData } from "./export-import";
import { salary, allowance, rent, groceries, diningOut } from "@/fixtures";
import { transportation, entertainment, shopping } from "@/fixtures/categories";

const incomes = [salary, allowance];
const expenses = [rent, groceries, diningOut];
const incomeCategories = [transportation];
const expenseCategories = [entertainment, shopping];

test("metadata contains correct version number and timestamp", () => {
  const { metadata } = createExportData({
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
  const { data } = createExportData({
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
