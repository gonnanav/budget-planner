import { test, expect } from './fixtures';

test('the budget starts empty with expenses selected', async ({ page, app }) => {
  const { incomeSummary, expensesSummary, balance } = app;

  await page.goto('/');

  await expect(incomeSummary).toContainText('$0');
  await expect(expensesSummary).toContainText('$0');
  await expect(balance).toContainText('Add items to see your balance');

  await expect(page.getByText('No expenses yet — add your first one below.')).toBeVisible();

  await incomeSummary.click();
  await expect(page.getByText('No income yet — add your first one below.')).toBeVisible();
});

test('the budget updates as items are added', async ({ page, app }) => {
  const { incomeSummary, expensesSummary, balance, addItem } = app;

  await page.goto('/');

  await addItem('Rent', '1000');

  await expect(expensesSummary).toContainText('$1,000');
  await expect(balance).toContainText('Deficit');
  await expect(balance).toContainText('$1,000');

  await incomeSummary.click();
  await addItem('Salary', '3000');

  await expect(incomeSummary).toContainText('$3,000');
  await expect(balance).toContainText('Surplus');
  await expect(balance).toContainText('$2,000');
});

test('downloads a backup of the current budget', async ({ page, app }) => {
  const { addItem, goToSettings, downloadBackup } = app;

  await page.goto('/');
  await addItem('Rent', '1000');
  await goToSettings();

  const { filename, data: backup } = await downloadBackup();

  expect(filename).toMatch(/^budget_v1_.*\.json$/);
  expect(backup.data.expenses).toContainEqual(
    expect.objectContaining({ name: 'Rent', amount: 1000 }),
  );
});

test('changing the currency relabels amounts without converting them', async ({ page, app }) => {
  const { expensesSummary, currencySelectInput, goToSettings, goToBudget, addItem, selectCurrency } = app;

  await page.goto('/');

  await addItem('Rent', '1000');
  await expect(expensesSummary).toContainText('$1,000');

  await goToSettings();
  await expect(currencySelectInput).toHaveValue(/USD/);
  await selectCurrency('ILS');

  await goToBudget();
  await expect(expensesSummary).toContainText('₪1,000');

  await page.reload();
  await expect(expensesSummary).toContainText('₪1,000');
});
