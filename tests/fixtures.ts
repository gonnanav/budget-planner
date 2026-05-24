import { test as base, expect, type Locator } from '@playwright/test';

type AppFixture = {
  incomeSummary: Locator;
  expensesSummary: Locator;
  balance: Locator;
  addItem: (name: string, amount: string) => Promise<void>;
};

export const test = base.extend<{ app: AppFixture }>({
  app: async ({ page }, use) => {
    const incomeSummary = page.getByRole('button', { name: /Income/ });
    const expensesSummary = page.getByRole('button', { name: /Expenses/ });
    const balance = page.getByRole('status', { name: 'Balance' });

    const addItem = async (name: string, amount: string) => {
      await page.getByRole('button', { name: 'Add' }).click();
      await page.getByLabel('Name').fill(name);
      await page.getByLabel('Amount').fill(amount);
      await page.getByRole('button', { name: 'Save' }).click();
    };

    await use({ incomeSummary, expensesSummary, balance, addItem });
  },
});

export { expect };