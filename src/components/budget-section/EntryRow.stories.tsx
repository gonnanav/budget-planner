import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { EntryRow } from "./EntryRow";
import { createTestEntry } from "@/fixtures";

const meta = {
  component: EntryRow,
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof EntryRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Monthly: Story = {
  args: {
    entry: createTestEntry({
      frequency: "monthly",
    }),
  },
};

export const BiMonthly: Story = {
  args: {
    entry: createTestEntry({
      frequency: "biMonthly",
    }),
  },
};

export const NoAmount: Story = {
  args: {
    entry: createTestEntry({
      amount: null,
    }),
  },
};

export const LongTextAndAmount: Story = {
  args: {
    entry: createTestEntry({
      name: "This is a very long budget entry name that should test overflow and wrapping in the BudgetEntryRow component for visual robustness",
      amount: 1234567890.99,
      frequency: "biMonthly",
    }),
  },
};
