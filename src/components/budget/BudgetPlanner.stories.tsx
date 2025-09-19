import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, screen } from "storybook/test";
import { Canvas } from "storybook/internal/types";
import { BudgetPlanner } from "./BudgetPlanner";

const meta = {
  title: "components/BudgetPlanner",
  component: BudgetPlanner,
} satisfies Meta<typeof BudgetPlanner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PositiveBalance: Story = {
  args: {
    initialIncomes: [4000, 5000],
    initialExpenses: [500, 100, 1000],
  },
  play: async ({ canvas }) => {
    await expect(getBalanceOutput(canvas)).toHaveTextContent("7,400");
  },
};

export const NegativeBalance: Story = {
  args: {
    initialIncomes: [1000, 2000],
    initialExpenses: [2000, 1100, 500],
  },
};

export const ZeroBalance: Story = {
  args: {
    initialIncomes: [1000, 2000],
    initialExpenses: [2000, 1000],
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
