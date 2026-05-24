import { test, expect } from './fixtures';

test('the budget starts empty', async ({ page, app }) => {
  const { incomeSummary, expensesSummary, balance } = app;

  await page.goto('/');

  await expect(incomeSummary).toContainText('₪0');
  await expect(expensesSummary).toContainText('₪0');
  await expect(balance).toContainText('Add items to see your balance');

  await expensesSummary.click();
  await expect(page.getByText('No expenses yet — add your first one below.')).toBeVisible();

  await incomeSummary.click();
  await expect(page.getByText('No income yet — add your first one below.')).toBeVisible();
});

test('the budget updates as items are added', async ({ page, app }) => {
  const { incomeSummary, expensesSummary, balance, addItem } = app;

  await page.goto('/');

  await expensesSummary.click();
  await addItem('Rent', '1000');

  await expect(expensesSummary).toContainText('₪1,000');
  await expect(balance).toContainText('Deficit');
  await expect(balance).toContainText('₪1,000');

  await incomeSummary.click();
  await addItem('Salary', '3000');

  await expect(incomeSummary).toContainText('₪3,000');
  await expect(balance).toContainText('Surplus');
  await expect(balance).toContainText('₪2,000');
});
