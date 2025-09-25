import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { BudgetEntryRow } from "./BudgetEntryRow";

const meta = {
  title: "Components/BudgetEntryRow",
  component: BudgetEntryRow,
} satisfies Meta<typeof BudgetEntryRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Monthly: Story = {
  args: {
    entry: {
      id: "1",
      name: "Electricity",
      amount: 500,
      frequency: "monthly",
    },
    onClick: () => {},
  },
};

export const BiMonthly: Story = {
  args: {
    entry: {
      id: "2",
      name: "Internet",
      amount: 500,
      frequency: "biMonthly",
    },
    onClick: () => {},
  },
};

export const NoAmount: Story = {
  args: {
    entry: {
      id: "3",
      name: "Groceries",
      amount: null,
      frequency: "monthly",
    },
    onClick: () => {},
  },
};
