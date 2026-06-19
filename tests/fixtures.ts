import { test as base, expect, type Locator } from '@playwright/test';

type AppFixture = {
  incomeSummary: Locator;
  expensesSummary: Locator;
  balance: Locator;
  currencySelectInput: Locator;
  getItem: (name: string) => Locator;
  addItem: (name: string, amount: string) => Promise<void>;
  deleteItem: (name: string) => Promise<void>;
  goToSettings: () => Promise<void>;
  goToBudget: () => Promise<void>;
  selectCurrency: (currency: string) => Promise<void>;
  downloadBackup: () => Promise<string>;
  restoreBackup: (path: string) => Promise<void>;
};

export const test = base.extend<{ app: AppFixture }>({
  app: async ({ page }, use) => {
    const incomeSummary = page.getByRole('button', { name: /Income/ });
    const expensesSummary = page.getByRole('button', { name: /Expenses/ });
    const balance = page.getByRole('status', { name: 'Balance' });
    const currencySelectInput = page.getByRole('combobox', { name: 'Currency' });

    const addButton = page.getByRole('button', { name: 'Add' });
    const nameInput = page.getByLabel('Name');
    const amountInput = page.getByLabel('Amount');
    const saveButton = page.getByRole('button', { name: 'Save' });
    const settingsLink = page.getByRole('link', { name: 'Settings' });
    const backToBudgetLink = page.getByRole('link', { name: 'Back to budget' });
    const deleteButton = page.getByRole('button', { name: 'Delete' });
    const downloadBackupButton = page.getByRole('button', { name: 'Download backup' });
    const backupFileInput = page.getByLabel('Select backup file');
    const acknowledgeCheckbox = page.getByRole('checkbox', { name: /permanently replace all my current data/ });
    const replaceDataButton = page.getByRole('button', { name: 'Replace my data' });

    const getItem = (name: string) => page.getByRole('button', { name });

    const addItem = async (name: string, amount: string) => {
      await addButton.click();
      await nameInput.fill(name);
      await amountInput.fill(amount);
      await saveButton.click();
    };

    const deleteItem = async (name: string) => {
      await getItem(name).click();
      await deleteButton.click();
    };

    const goToSettings = async () => {
      await settingsLink.click();
    };

    const goToBudget = async () => {
      await backToBudgetLink.click();
    };

    const selectCurrency = async (currency: string) => {
      const currencyOption = page.getByRole('option', { name: currency });

      await currencySelectInput.click();
      await currencySelectInput.fill(currency);
      await currencyOption.click();
    };

    const downloadBackup = async (): Promise<string> => {
      const downloadPromise = page.waitForEvent('download');
      await downloadBackupButton.click();
      const download = await downloadPromise;

      return download.path();
    };

    const restoreBackup = async (path: string) => {
      await backupFileInput.setInputFiles(path);
      await acknowledgeCheckbox.check();
      await replaceDataButton.click();
    };

    await use({
      incomeSummary,
      expensesSummary,
      balance,
      currencySelectInput,
      getItem,
      addItem,
      deleteItem,
      goToSettings,
      goToBudget,
      selectCurrency,
      downloadBackup,
      restoreBackup,
    });
  },
});

export { expect };