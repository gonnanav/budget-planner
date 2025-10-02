import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Canvas } from "storybook/internal/types";
import { OverviewPage } from "./OverviewPage";
import { IncomesProvider } from "@/providers/IncomesProvider";
import { ExpensesProvider } from "@/providers/ExpensesProvider";
import { createTestEntries } from "@/fixtures";

const meta = {
  component: OverviewPage,
  decorators: [
    (Story, { parameters }) => (
      <IncomesProvider
        initialIncomes={createTestEntries([
          { amount: parameters.incomeAmount },
        ])}
      >
        <ExpensesProvider
          initialExpenses={createTestEntries([
            { amount: parameters.expenseAmount },
          ])}
        >
          <Story />
        </ExpensesProvider>
      </IncomesProvider>
    ),
  ],
} satisfies Meta<typeof OverviewPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PositiveBalance: Story = {
  parameters: {
    incomeAmount: 5000,
    expenseAmount: 2800,
  },
  play: async ({ canvas }) => {
    await expect(getSection(canvas, "Income")).toHaveTextContent(/5,000/);
    await expect(getSection(canvas, "Expenses")).toHaveTextContent(/2,800/);
    await expect(getSection(canvas, "Balance")).toHaveTextContent(/2,200/);
  },
};

export const NegativeBalance: Story = {
  parameters: {
    incomeAmount: 2800,
    expenseAmount: 5000,
  },
};

export const Balanced: Story = {
  parameters: {
    incomeAmount: 5000,
    expenseAmount: 5000,
  },
};

function getSection(canvas: Canvas, label: string) {
  return canvas.getByRole("region", { name: label });
}
