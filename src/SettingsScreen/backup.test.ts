import { test, expect, describe } from "vitest";
import { DEFAULT_CURRENCY } from "@/currency";
import type { DbItem } from "@/db";
import { createBackupData } from "./backup";
import type { DbBudget } from "./types";

const emptyBudget: DbBudget = { income: [], expenses: [], settings: [] };
const exportedAt = "2026-06-19T12:00:00.000Z";

describe("metadata", () => {
  test("the backup is stamped with the current version", () => {
    const backup = createBackupData(emptyBudget, exportedAt);

    expect(backup.metadata.version).toBe(1);
  });

  test("the backup records when it was exported", () => {
    const backup = createBackupData(emptyBudget, exportedAt);

    expect(backup.metadata.exportedAt).toBe(exportedAt);
  });
});

describe("items", () => {
  test("income and expenses are kept in separate lists", () => {
    const budget: DbBudget = {
      ...emptyBudget,
      income: [createTestDbItem({ id: "i1", name: "Salary" })],
      expenses: [createTestDbItem({ id: "e1", name: "Rent" })],
    };

    const { data } = createBackupData(budget, exportedAt);

    expect(data.income).toMatchObject([{ name: "Salary" }]);
    expect(data.expenses).toMatchObject([{ name: "Rent" }]);
  });

  test("an item keeps its fields but drops the database id", () => {
    const budget: DbBudget = {
      ...emptyBudget,
      expenses: [
        createTestDbItem({
          id: "e1",
          name: "Rent",
          amount: 1000,
          frequency: "biMonthly",
          category: "Housing",
          notes: "Due on the 1st",
        }),
      ],
    };

    const { data } = createBackupData(budget, exportedAt);

    expect(data.expenses[0]).toEqual({
      name: "Rent",
      amount: 1000,
      frequency: "biMonthly",
      category: "Housing",
      notes: "Due on the 1st",
    });
  });
});

describe("settings", () => {
  test("the currency is taken from the stored setting", () => {
    const budget: DbBudget = {
      ...emptyBudget,
      settings: [{ key: "currency", value: "ILS" }],
    };

    const { data } = createBackupData(budget, exportedAt);

    expect(data.settings.currency).toBe("ILS");
  });

  test("the currency falls back to the default when nothing is stored", () => {
    const { data } = createBackupData(emptyBudget, exportedAt);

    expect(data.settings.currency).toBe(DEFAULT_CURRENCY);
  });
});

function createTestDbItem(input: Partial<DbItem> = {}): DbItem {
  return {
    id: "1",
    name: "Item",
    amount: null,
    frequency: "monthly",
    category: "",
    notes: "",
    ...input,
  };
}
