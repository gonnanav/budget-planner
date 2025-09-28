import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Canvas } from "storybook/internal/types";
import { BudgetPlanner } from "./BudgetPlanner";
import { createTestEntries } from "./core/test-utils";
import {
  salary,
  allowance,
  investment,
  rent,
  groceries,
  diningOut,
} from "./core/fixtures";

const meta = {
  title: "components/BudgetPlanner",
  component: BudgetPlanner,
} satisfies Meta<typeof BudgetPlanner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PositiveBalance: Story = {
  args: {
    initialIncomes: [salary, allowance],
    initialExpenses: [rent, groceries, diningOut],
  },
};

export const NegativeBalance: Story = {
  args: {
    initialIncomes: [allowance, investment],
    initialExpenses: [rent, groceries, diningOut],
  },
};

export const ZeroBalance: Story = {
  args: {
    initialIncomes: [salary],
    initialExpenses: createTestEntries([
      { name: "Misc", amount: salary.amount },
    ]),
  },
};

export const Pristine: Story = {};
