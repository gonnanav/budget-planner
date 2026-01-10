import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BudgetScreen } from "./BudgetScreen";
import { bills, personal, transportation } from "fixtures/expense-categories";
import { electricity, water, gas, diningOut, hobbies } from "fixtures/expenses";
import { salary, allowance, investment } from "fixtures/incomes";
import { createTestItems } from "fixtures/test-utils";

const meta = {
  component: BudgetScreen,
} satisfies Meta<typeof BudgetScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

const asyncAdd = async () => "new-id";
const asyncUpdate = async () => true;
const asyncRemove = async () => {};

export const Default: Story = {
  args: {
    income: {
      items: {
        data: [salary, allowance, investment],
        add: asyncAdd,
        update: asyncUpdate,
        delete: asyncRemove,
      },
      categories: {
        data: [],
        add: asyncAdd,
        update: asyncUpdate,
        delete: asyncRemove,
      },
    },
    expenses: {
      items: {
        data: [electricity, water, gas, diningOut, hobbies],
        add: asyncAdd,
        update: asyncUpdate,
        delete: asyncRemove,
      },
      categories: {
        data: [bills, personal, transportation],
        add: asyncAdd,
        update: asyncUpdate,
        delete: asyncRemove,
      },
    },
  },
};

const longExpenseItems = createTestItems(
  Array.from({ length: 60 }, (_, index) => ({
    amount: 20 + index * 3,
  })),
);

const longIncomeItems = createTestItems(
  Array.from({ length: 40 }, (_, index) => ({
    amount: 500 + index * 25,
  })),
);

export const LongList: Story = {
  args: {
    income: {
      items: {
        data: longIncomeItems,
        add: asyncAdd,
        update: asyncUpdate,
        delete: asyncRemove,
      },
      categories: {
        data: [],
        add: asyncAdd,
        update: asyncUpdate,
        delete: asyncRemove,
      },
    },
    expenses: {
      items: {
        data: longExpenseItems,
        add: asyncAdd,
        update: asyncUpdate,
        delete: asyncRemove,
      },
      categories: {
        data: [bills, personal, transportation],
        add: asyncAdd,
        update: asyncUpdate,
        delete: asyncRemove,
      },
    },
  },
};
