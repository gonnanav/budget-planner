import { test, expect } from "vitest";
import {
  createEntry,
  addEntry,
  updateEntryIn,
  removeEntry,
} from "./budget-entries";
import { createTestEntry, createTestEntries } from "./test-utils";

test("creates an entry based on the given input", () => {
  const entry = createEntry("1", { amount: 100 });

  expect(entry).toMatchObject({ id: "1", amount: 100 });
});

test("creates an entry with defaults for optional input properties", () => {
  const entry = createEntry("1");

  expect(entry).toMatchObject({ amount: 0 });
});

test("adds a new entry to an empty array", () => {
  const entries = addEntry([], "1", { amount: 200 });

  expect(entries).toMatchObject([{ id: "1" }]);
});

test("adds a new entry to an array with existing entries", () => {
  const original = createTestEntries([{ id: "1" }]);
  const entries = addEntry(original, "2", { amount: 300 });

  expect(entries).toMatchObject([{ id: "1" }, { id: "2" }]);
});

test("adds a new entry based on the given input", () => {
  const [entry] = addEntry([], "1", { amount: 200 });

  expect(entry).toMatchObject({ id: "1", amount: 200 });
});

test("updates an entry at the given index", () => {
  const original = createTestEntries([
    { id: "1", amount: 100 },
    { id: "2", amount: 200 },
  ]);
  const entries = updateEntryIn(original, 1, { amount: 500 });

  expect(entries).toMatchObject([
    { id: "1", amount: 100 },
    { id: "2", amount: 500 },
  ]);
});

test("throws error for updating an entry at an invalid index", () => {
  const entries = [createTestEntry()];

  expect(() => updateEntryIn(entries, -1, { amount: 200 })).toThrow();
  expect(() => updateEntryIn(entries, 1, { amount: 200 })).toThrow();
});

test("removes an entry at the given index from multiple entries array", () => {
  const original = createTestEntries([{ id: "1" }, { id: "2" }]);
  const entries = removeEntry(original, 1);

  expect(entries).toMatchObject([{ id: "1" }]);
});

test("removes an entry at the given index from single entry array", () => {
  const original = [createTestEntry()];
  const entries = removeEntry(original, 0);

  expect(entries).toEqual([]);
});

test("throws error for removing an entry at an invalid index", () => {
  const entries = createTestEntries([{ id: "1" }, { id: "2" }]);

  expect(() => removeEntry(entries, -1)).toThrow();
  expect(() => removeEntry(entries, 2)).toThrow();
});
