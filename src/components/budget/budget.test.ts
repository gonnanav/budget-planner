import { it, expect } from 'vitest';
import { evaluateBudget } from './budget';

it('returns a balanced balance when incomes and expenses are equal', () => {
  const { balance, status } = evaluateBudget(1000, 1000);

  expect(balance).toBe(0);
  expect(status).toBe('balanced');
});

it('returns a positive balance when incomes are greater than expenses', () => {
  const { balance, status } = evaluateBudget(1000, 500);

  expect(balance).toBe(500);
  expect(status).toBe('positive');
});

it('returns a negative balance when expenses are greater than incomes', () => {
  const { balance, status } = evaluateBudget(500, 1000);

  expect(balance).toBe(-500);
  expect(status).toBe('negative');
});
