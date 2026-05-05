import { test, expect } from './fixtures';

test('adding income and expense items updates the overview', async ({ page, app }) => {
  const { incomeButton, expensesButton, balance, addItem } = app;

  await page.goto('/');

  await expect(incomeButton).toContainText('₪0');
  await expect(expensesButton).toContainText('₪0');
  await expect(balance).toContainText('Balanced');

  await expensesButton.click();
  await addItem('Rent', '1000');

  await expect(expensesButton).toContainText('₪1,000');
  await expect(balance).toContainText('Deficit');
  await expect(balance).toContainText('₪1,000');

  await incomeButton.click();
  await addItem('Salary', '3000');

  await expect(incomeButton).toContainText('₪3,000');
  await expect(balance).toContainText('Surplus');
  await expect(balance).toContainText('₪2,000');
});
