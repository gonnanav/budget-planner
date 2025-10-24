import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { ItemListItem } from "@/components/item-list-item";

const meta = {
  component: ItemListItem,
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof ItemListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Monthly: Story = {
  args: {
    name: "Monthly Expense",
    amount: 1000,
    frequency: "monthly",
    normalizedAmount: 1000,
  },
};

export const BiMonthly: Story = {
  args: {
    name: "Bi-Monthly Expense",
    amount: 2000,
    frequency: "biMonthly",
    normalizedAmount: 1000,
  },
};

export const NoAmount: Story = {
  args: {
    name: "No Amount Expense",
    amount: null,
    frequency: "monthly",
    normalizedAmount: 0,
  },
};

export const LongTextAndAmount: Story = {
  args: {
    name: "This is a very long budget entry name that should test overflow and wrapping in the BudgetEntryRow component for visual robustness",
    amount: 1234567890.99,
    frequency: "biMonthly",
    normalizedAmount: 617283945.495,
  },
};
