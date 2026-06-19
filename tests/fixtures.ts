import { test as base, expect, type Locator } from '@playwright/test';
import type { BackupData } from '../src/SettingsScreen/types';

type DownloadedBackup = {
  filename: string;
  data: BackupData;
};

type AppFixture = {
  incomeSummary: Locator;
  expensesSummary: Locator;
  balance: Locator;
  currencySelectInput: Locator;
  addItem: (name: string, amount: string) => Promise<void>;
  goToSettings: () => Promise<void>;
  goToBudget: () => Promise<void>;
  selectCurrency: (currency: string) => Promise<void>;
  downloadBackup: () => Promise<DownloadedBackup>;
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
    const downloadBackupButton = page.getByRole('button', { name: 'Download backup' });

    const addItem = async (name: string, amount: string) => {
      await addButton.click();
      await nameInput.fill(name);
      await amountInput.fill(amount);
      await saveButton.click();
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

    const downloadBackup = async (): Promise<DownloadedBackup> => {
      const downloadPromise = page.waitForEvent('download');
      await downloadBackupButton.click();
      const download = await downloadPromise;

      const stream = await download.createReadStream();
      stream.setEncoding('utf-8');
      let contents = '';
      for await (const chunk of stream) {
        contents += chunk;
      }

      return {
        filename: download.suggestedFilename(),
        data: JSON.parse(contents) as BackupData,
      };
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
      downloadBackup,
    });
  },
});

export { expect };