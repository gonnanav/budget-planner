import { test, expect } from '@playwright/test';

test('shows Budget Planner text', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Budget Planner')).toBeVisible();
});
