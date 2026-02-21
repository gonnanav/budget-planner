import { test, expect } from "vitest";
import { createBackupData } from "./backup";
import { salary, freelance, investment } from "fixtures/incomeItems";
import {
  rent,
  electricity,
  water,
  internet,
  gas,
  carInsurance,
  groceries,
  diningOut,
  gymMembership,
  streamingServices,
  hobbies,
} from "fixtures/expenseItems";
import { employment, passive } from "fixtures/incomeCategories";
import { housing, transportation, food, personal } from "fixtures/expenseCategories";

const incomeItems = [salary, freelance, investment];
const expenseItems = [
  rent,
  electricity,
  water,
  internet,
  gas,
  carInsurance,
  groceries,
  diningOut,
  gymMembership,
  streamingServices,
  hobbies,
];
const incomeCategories = [employment, passive];
const expenseCategories = [housing, transportation, food, personal];

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
