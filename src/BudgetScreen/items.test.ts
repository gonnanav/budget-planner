import { test, expect } from "vitest";
import { createItemRecord } from "./budget";

test("creates an item record with defaults for optional input properties", () => {
  const record = createItemRecord({ id: "1", name: "Some item" });

  expect(record).toMatchObject({ amount: null, frequency: "monthly" });
});
