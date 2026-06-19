import { test as base, expect, type Locator } from '@playwright/test';

type AppFixture = {
  incomeSummary: Locator;
  expensesSummary: Locator;
  balance: Locator;
  currencySelectInput: Locator;
  addItem: (name: string, amount: string) => Promise<void>;
  goToSettings: () => Promise<void>;
  goToBudget: () => Promise<void>;
  selectCurrency: (currency: string) => Promise<void>;
};

export const test = base.extend<{ app: AppFixture }>({
  app: async ({ page }, use) => {
    const incomeSummary = page.getByRole('button', { name: /Income/ });
    const expensesSummary = page.getByRole('button', { name: /Expenses/ });
    const balance = page.getByRole('status', { name: 'Balance' });
    const currencySelectInput = page.getByRole('combobox', { name: 'Currency' });

    const addItem = async (name: string, amount: string) => {
      await page.getByRole('button', { name: 'Add' }).click();
      await page.getByLabel('Name').fill(name);
      await page.getByLabel('Amount').fill(amount);
      await page.getByRole('button', { name: 'Save' }).click();
    };

    const goToSettings = async () => {
      await page.getByRole('link', { name: 'Settings' }).click();
    };

    const goToBudget = async () => {
      await page.getByRole('link', { name: 'Back to budget' }).click();
    };

    const selectCurrency = async (currency: string) => {
      await currencySelectInput.click();
      await currencySelectInput.fill(currency);
      await page.getByRole('option', { name: currency }).click();
    };

    await use({
      incomeSummary,
      expensesSummary,
      balance,
      currencySelectInput,
      addItem,
      goToSettings,
      goToBudget,
      selectCurrency,
    });
  },
});

export { expect };