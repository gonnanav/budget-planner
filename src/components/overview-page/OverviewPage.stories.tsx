import type { Meta, StoryObj } from "@storybook/nextjs-vite";
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
