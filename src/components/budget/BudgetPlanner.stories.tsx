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
    initialIncomes: [
      { id: "1", amount: 4000 },
      { id: "2", amount: 5000 },
    ],
    initialExpenses: [
      { id: "3", amount: 500 },
      { id: "4", amount: 100 },
      { id: "5", amount: 1000 },
    ],
  },
  play: async ({ canvas }) => {
    await expect(getBalanceOutput(canvas)).toHaveTextContent("7,400");
  },
};

export const NegativeBalance: Story = {
  args: {
    initialIncomes: [
      { id: "1", amount: 1000 },
      { id: "2", amount: 2000 },
    ],
    initialExpenses: [
      { id: "3", amount: 2000 },
      { id: "4", amount: 1100 },
      { id: "5", amount: 500 },
    ],
  },
};

export const ZeroBalance: Story = {
  args: {
    initialIncomes: [
      { id: "1", amount: 1000 },
      { id: "2", amount: 2000 },
    ],
    initialExpenses: [
      { id: "3", amount: 2000 },
      { id: "4", amount: 1000 },
    ],
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
