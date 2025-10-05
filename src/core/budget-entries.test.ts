import { test, expect } from "vitest";
import { createEntry } from "./budget-entries";

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

test("throws error for creating an entry without a name", () => {
  expect(() => createEntry({ id: "1", name: "", amount: 100 })).toThrow();
});

test("throws error for creating an entry with an invalid amount", () => {
  expect(() =>
    createEntry({ id: "1", name: "Some entry", amount: -1 }),
  ).toThrow();
});
