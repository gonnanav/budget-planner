import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OverviewScreen } from "./OverviewScreen";

const meta = {
  title: "Overview/OverviewScreen",
  component: OverviewScreen,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    incomeSum: "0",
    expenseSum: "0",
    balance: {
      amount: "0",
      status: "balanced",
    },
  },
} satisfies Meta<typeof OverviewScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Surplus: Story = {
  args: {
    incomeSum: "1500",
    expenseSum: "1000",
    balance: {
      amount: "500",
      status: "surplus",
    },
  },
};

export const Deficit: Story = {
  args: {
    incomeSum: "1000",
    expenseSum: "1500",
    balance: {
      amount: "500",
      status: "deficit",
    },
  },
};

export const Balanced: Story = {
  args: {
    incomeSum: "1000",
    expenseSum: "1000",
    balance: {
      amount: "0",
      status: "balanced",
    },
  },
};

export const Empty: Story = {
  args: {
    incomeSum: "0",
    expenseSum: "0",
    balance: {
      amount: "0",
      status: "balanced",
    },
  },
};
