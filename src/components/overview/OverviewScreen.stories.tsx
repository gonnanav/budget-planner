import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { OverviewScreen } from "./OverviewScreen";
import { formatAmount } from "@/lib/format";

const meta = {
  title: "Overview/OverviewScreen",
  component: OverviewScreen,
} satisfies Meta<typeof OverviewScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PositiveBalance: Story = {
  args: {
    income: formatAmount(5000),
    expense: formatAmount(2800),
    balance: formatAmount(2200),
    balanceStatus: "surplus",
    incomeItemCount: 5,
    incomeCategoryCount: 2,
    expenseItemCount: 8,
    expenseCategoryCount: 3,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Income")).toBeInTheDocument();
    await expect(canvas.getByText(/5,000/)).toBeInTheDocument();
    await expect(canvas.getByText("Expenses")).toBeInTheDocument();
    await expect(canvas.getByText(/2,800/)).toBeInTheDocument();
    await expect(canvas.getByText(/Surplus/)).toBeInTheDocument();
  },
};

export const NegativeBalance: Story = {
  args: {
    income: formatAmount(2800),
    expense: formatAmount(5000),
    balance: formatAmount(2200),
    balanceStatus: "deficit",
    incomeItemCount: 3,
    incomeCategoryCount: 1,
    expenseItemCount: 12,
    expenseCategoryCount: 5,
  },
};

export const Balanced: Story = {
  args: {
    income: formatAmount(5000),
    expense: formatAmount(5000),
    balance: formatAmount(0),
    balanceStatus: "balanced",
    incomeItemCount: 4,
    incomeCategoryCount: 2,
    expenseItemCount: 10,
    expenseCategoryCount: 4,
  },
};

export const Empty: Story = {
  args: {
    income: formatAmount(0),
    expense: formatAmount(0),
    balance: formatAmount(0),
    balanceStatus: "balanced",
    incomeItemCount: 0,
    incomeCategoryCount: 0,
    expenseItemCount: 0,
    expenseCategoryCount: 0,
  },
};
