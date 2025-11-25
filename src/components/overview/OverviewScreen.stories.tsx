import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { OverviewScreen } from "./OverviewScreen";

const meta = {
  title: "Overview/OverviewScreen",
  component: OverviewScreen,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    income: {
      itemCount: 0,
      categoryCount: 0,
      sum: "0",
    },
    expense: {
      itemCount: 0,
      categoryCount: 0,
      sum: "0",
    },
    balance: {
      amount: "0",
      status: "balanced",
    },
    backupActions: {
      backup: fn(),
      restore: fn(),
    },
  },
} satisfies Meta<typeof OverviewScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Surplus: Story = {
  args: {
    income: {
      itemCount: 1,
      categoryCount: 2,
      sum: "1500",
    },
    expense: {
      itemCount: 1,
      categoryCount: 3,
      sum: "1000",
    },
    balance: {
      amount: "500",
      status: "surplus",
    },
  },
};

export const Deficit: Story = {
  args: {
    income: {
      itemCount: 1,
      categoryCount: 2,
      sum: "1000",
    },
    expense: {
      itemCount: 1,
      categoryCount: 3,
      sum: "1500",
    },
    balance: {
      amount: "500",
      status: "deficit",
    },
  },
};

export const Balanced: Story = {
  args: {
    income: {
      itemCount: 1,
      categoryCount: 1,
      sum: "1000",
    },
    expense: {
      itemCount: 1,
      categoryCount: 1,
      sum: "1000",
    },
    balance: {
      amount: "0",
      status: "balanced",
    },
  },
};

export const Empty: Story = {
  args: {
    income: {
      itemCount: 0,
      categoryCount: 0,
      sum: "0",
    },
    expense: {
      itemCount: 0,
      categoryCount: 0,
      sum: "0",
    },
    balance: {
      amount: "0",
      status: "balanced",
    },
  },
};
