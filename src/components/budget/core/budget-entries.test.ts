import { test, expect } from "vitest";
import {
  createEntry,
  addEntry,
  updateEntryIn,
  removeEntry,
} from "./budget-entries";
import { createTestEntries } from "./test-utils";
import { salary, allowance } from "./fixtures";

test("creates an entry based on the given input", () => {
  const entry = createEntry({
    id: "1",
    name: "Some entry",
    amount: 100,
    frequency: "biMonthly",
  });

  expect(entry).toMatchObject({
    id: "1",
    name: "Some entry",
    amount: 100,
    frequency: "biMonthly",
  });
});

test("creates an entry with defaults for optional input properties", () => {
  const entry = createEntry({ id: "1", name: "Some entry" });

  expect(entry).toMatchObject({ amount: null, frequency: "monthly" });
});

test("throws error for creating an entry with an invalid amount", () => {
  expect(() =>
    createEntry({ id: "1", name: "Some entry", amount: -1 }),
  ).toThrow();
});

test("adds a new entry to an empty array", () => {
  const entries = addEntry([], salary);

  expect(entries).toMatchObject([salary]);
});

test("adds a new entry to an array with existing entries", () => {
  const entries = addEntry([salary], allowance);

  expect(entries).toMatchObject([salary, allowance]);
});

test("adds a new entry based on the given input", () => {
  const [entry] = addEntry([], { id: "1", name: "Some entry", amount: 200 });

  expect(entry).toMatchObject({ id: "1", name: "Some entry", amount: 200 });
});

test("throws error for adding an entry with an invalid amount", () => {
  expect(() =>
    addEntry([], { id: "1", name: "Some entry", amount: -1 }),
  ).toThrow();
});

test("updates an entry at the given index", () => {
  const original = createTestEntries([
    salary,
    { id: "misc-income", name: "Misc Income", amount: 500 },
  ]);
  const entries = updateEntryIn(original, 1, {
    name: "Misc",
    amount: 1000,
    frequency: "biMonthly",
  });

  expect(entries).toMatchObject([
    salary,
    { id: "misc-income", name: "Misc", amount: 1000, frequency: "biMonthly" },
  ]);
});

test("throws error for updating an entry at an invalid index", () => {
  const entries = [salary];

  expect(() => updateEntryIn(entries, -1, { name: "Misc" })).toThrow();
  expect(() => updateEntryIn(entries, 1, { name: "Misc" })).toThrow();
});

test("throws error for updating an entry with an invalid amount", () => {
  const entries = [salary];

  expect(() =>
    updateEntryIn(entries, 0, { name: "Misc", amount: -1 }),
  ).toThrow();
});

test("removes an entry at the given index from multiple entries array", () => {
  const entries = removeEntry([salary, allowance], 1);

  expect(entries).toMatchObject([salary]);
});

test("removes an entry at the given index from single entry array", () => {
  const entries = removeEntry([salary], 0);

  expect(entries).toEqual([]);
});

test("throws error for removing an entry at an invalid index", () => {
  const entries = [salary];

  expect(() => removeEntry(entries, -1)).toThrow();
  expect(() => removeEntry(entries, 1)).toThrow();
});
