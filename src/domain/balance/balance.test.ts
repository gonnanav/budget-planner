import { test, expect } from "vitest";
import { calculateBalance } from "./balance";
import { createTestItems } from "fixtures/utils";

test("balanced when incomes and expenses are equal", () => {
  const { balance, status } = calculateBalance(
    createTestItems([{ amount: 1000 }]),
    createTestItems([{ amount: 1000 }]),
  );

  expect(balance).toBe(0);
  expect(status).toBe("balanced");
});

test("in surplus when incomes are greater than expenses", () => {
  const { balance, status } = calculateBalance(
    createTestItems([{ amount: 1000 }]),
    createTestItems([{ amount: 500 }]),
  );

  expect(balance).toBe(500);
  expect(status).toBe("surplus");
});

test("in deficit when expenses are greater than incomes", () => {
  const { balance, status } = calculateBalance(
    createTestItems([{ amount: 500 }]),
    createTestItems([{ amount: 1000 }]),
  );

  expect(balance).toBe(-500);
  expect(status).toBe("deficit");
});

test("no income is counted as zero", () => {
  const { balance } = calculateBalance([], createTestItems([{ amount: 1000 }]));

  expect(balance).toBe(-1000);
});

test("multiple incomes are summed up", () => {
  const { balance } = calculateBalance(
    createTestItems([{ amount: 400 }, { amount: 600 }]),
    createTestItems([{ amount: 500 }]),
  );

  expect(balance).toBe(500);
});

test("no expense is counted as zero", () => {
  const { balance } = calculateBalance(createTestItems([{ amount: 1000 }]), []);

  expect(balance).toBe(1000);
});

test("multiple expenses are summed up", () => {
  const { balance } = calculateBalance(
    createTestItems([{ amount: 1000 }]),
    createTestItems([{ amount: 300 }, { amount: 200 }]),
  );

  expect(balance).toBe(500);
});
