import { test, expect } from "vitest";
import { createBudget } from "./budget";
import { createTestItemRecords } from "./test-utils";

test("balanced when incomes and expenses are equal", () => {
  const { balance } = createBudget(
    { items: createTestItemRecords([{ amount: 1000 }]), categories: [] },
    { items: createTestItemRecords([{ amount: 1000 }]), categories: [] },
  );

  expect(balance.delta).toBe(0);
  expect(balance.status).toBe("balanced");
});

test("in surplus when incomes are greater than expenses", () => {
  const { balance } = createBudget(
    { items: createTestItemRecords([{ amount: 1000 }]), categories: [] },
    { items: createTestItemRecords([{ amount: 500 }]), categories: [] },
  );

  expect(balance.delta).toBe(500);
  expect(balance.status).toBe("surplus");
});

test("in deficit when expenses are greater than incomes", () => {
  const { balance } = createBudget(
    { items: createTestItemRecords([{ amount: 500 }]), categories: [] },
    { items: createTestItemRecords([{ amount: 1000 }]), categories: [] },
  );

  expect(balance.delta).toBe(-500);
  expect(balance.status).toBe("deficit");
});

test("no income is counted as zero", () => {
  const { balance } = createBudget(
    { items: [], categories: [] },
    { items: createTestItemRecords([{ amount: 1000 }]), categories: [] },
  );

  expect(balance.delta).toBe(-1000);
});

test("multiple incomes are summed up", () => {
  const { balance } = createBudget(
    { items: createTestItemRecords([{ amount: 400 }, { amount: 600 }]), categories: [] },
    { items: createTestItemRecords([{ amount: 500 }]), categories: [] },
  );

  expect(balance.delta).toBe(500);
});

test("no expense is counted as zero", () => {
  const { balance } = createBudget(
    { items: createTestItemRecords([{ amount: 1000 }]), categories: [] },
    { items: [], categories: [] },
  );

  expect(balance.delta).toBe(1000);
});

test("multiple expenses are summed up", () => {
  const { balance } = createBudget(
    { items: createTestItemRecords([{ amount: 1000 }]), categories: [] },
    { items: createTestItemRecords([{ amount: 300 }, { amount: 200 }]), categories: [] },
  );

  expect(balance.delta).toBe(500);
});
