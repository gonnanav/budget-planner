import { test, expect } from "vitest";
import { createExportData } from "./export";
import { salary, allowance, rent, groceries, diningOut } from "@/fixtures";

const incomes = [salary, allowance];
const expenses = [rent, groceries, diningOut];

test("metadata contains correct version number and timestamp", () => {
  const { metadata } = createExportData(incomes, expenses);

  expect(metadata).toMatchObject({
    version: "0.1.0",
    exportedAt: expect.any(String),
  });
});

test("data section contains data in the correct format", () => {
  const { data } = createExportData(incomes, expenses);

  expect(data).toEqual({
    incomes,
    expenses,
  });
});
