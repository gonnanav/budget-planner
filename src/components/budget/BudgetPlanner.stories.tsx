import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, screen } from "storybook/test";
import { Canvas } from "storybook/internal/types";
import { BudgetPlanner } from "./BudgetPlanner";
import { createBudgetEntry } from "./budget-entries";

const meta = {
  title: "components/BudgetPlanner",
  component: BudgetPlanner,
} satisfies Meta<typeof BudgetPlanner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PositiveBalance: Story = {
  args: {
    initialIncomes: [createBudgetEntry(4000), createBudgetEntry(5000)],
    initialExpenses: [
      createBudgetEntry(500),
      createBudgetEntry(100),
      createBudgetEntry(1000),
    ],
  },
  play: async ({ canvas }) => {
    await expect(getBalanceOutput(canvas)).toHaveTextContent("7,400");
  },
};

export const NegativeBalance: Story = {
  args: {
    initialIncomes: [createBudgetEntry(1000), createBudgetEntry(2000)],
    initialExpenses: [
      createBudgetEntry(2000),
      createBudgetEntry(1100),
      createBudgetEntry(500),
    ],
  },
};

export const ZeroBalance: Story = {
  args: {
    initialIncomes: [createBudgetEntry(1000), createBudgetEntry(2000)],
    initialExpenses: [createBudgetEntry(2000), createBudgetEntry(1000)],
  },
};

export const Pristine: Story = {
  play: async ({ canvas }) => {
    await expect(getBalanceOutput(canvas)).toHaveTextContent("0");
  },
};

function getBalanceOutput(canvas: Canvas) {
  return canvas.getByRole("status", { name: "Balance" });
}
