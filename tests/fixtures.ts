import { test as base, expect, type Locator } from '@playwright/test';

type AppFixture = {
  incomeButton: Locator;
  expensesButton: Locator;
  balance: Locator;
  addItem: (name: string, amount: string) => Promise<void>;
};

export const test = base.extend<{ app: AppFixture }>({
  app: async ({ page }, use) => {
    const incomeButton = page.getByRole('button', { name: /Income/ });
    const expensesButton = page.getByRole('button', { name: /Expenses/ });
    const balance = page.getByRole('status', { name: 'Balance' });

    const addItem = async (name: string, amount: string) => {
      await page.getByRole('button', { name: 'Add item' }).click();
      await page.getByLabel('Name').fill(name);
      await page.getByLabel('Amount').fill(amount);
      await page.getByRole('button', { name: 'Save' }).click();
    };

    await use({ incomeButton, expensesButton, balance, addItem });
  },
});

export { expect };