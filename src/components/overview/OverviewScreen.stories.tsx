import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { OverviewScreen } from "./OverviewScreen";
import { createTestItems } from "@/fixtures/test-utils";

const meta = {
  title: "Overview/OverviewScreen",
  component: OverviewScreen,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    onIncomeClick: fn(),
    onExpenseClick: fn(),
    onBackup: fn(),
    onRestore: fn(),
  },
} satisfies Meta<typeof OverviewScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PositiveBalance: Story = {
  args: {
    incomeItems: createTestItems([{ amount: 1500 }]),
    expenseItems: createTestItems([{ amount: 1000 }]),
  },
};

export const NegativeBalance: Story = {
  args: {
    incomeItems: createTestItems([{ amount: 1000 }]),
    expenseItems: createTestItems([{ amount: 1500 }]),
  },
};

export const Balanced: Story = {
  args: {
    incomeItems: createTestItems([{ amount: 1000 }]),
    expenseItems: createTestItems([{ amount: 1000 }]),
  },
};

export const Empty: Story = {
  args: {
    incomeItems: [],
    expenseItems: [],
  },
};
