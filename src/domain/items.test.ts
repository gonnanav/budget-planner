import { test, expect } from "vitest";
import { createItem, createItemRecord } from "./budget";

test("creates an item record with defaults for optional input properties", () => {
  const record = createItemRecord({ id: "1", name: "Some item" });

  expect(record).toMatchObject({ amount: null, frequency: "monthly" });
});

test.each([
  { amount: 100, frequency: "monthly" as const, expected: 100 },
  { amount: 100, frequency: "biMonthly" as const, expected: 50 },
  { amount: null, frequency: "monthly" as const, expected: 0 },
])(
  "normalizes amount based on frequency",
  ({ amount, frequency, expected }) => {
    const record = createItemRecord({ id: "1", name: "Test", amount, frequency });
    const { normalizedAmount } = createItem(record);

    expect(normalizedAmount).toBe(expected);
  },
);
