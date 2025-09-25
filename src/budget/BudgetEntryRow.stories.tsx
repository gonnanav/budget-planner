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

export const ListPreview: Story = {
  args: {
    entry: { id: "x", name: "", amount: 0, frequency: "monthly" },
    onClick: () => {},
  },
  render: () => (
    <div className="flex flex-col gap-1">
      <BudgetEntryRow
        entry={{ id: "1", name: "Salary", amount: 12000, frequency: "monthly" }}
        onClick={() => {}}
      />
      <BudgetEntryRow
        entry={{
          id: "2",
          name: "Internet",
          amount: 500,
          frequency: "biMonthly",
        }}
        onClick={() => {}}
      />
      <BudgetEntryRow
        entry={{
          id: "3",
          name: "Groceries",
          amount: null,
          frequency: "monthly",
        }}
        onClick={() => {}}
      />
    </div>
  ),
};
