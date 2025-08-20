import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BudgetPlanner } from "./BudgetPlanner";
import { expect } from "storybook/test";
import { Canvas } from "storybook/internal/types";

const meta = {
  title: "components/BudgetPlanner",
  component: BudgetPlanner,
} satisfies Meta<typeof BudgetPlanner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PositiveBalance: Story = {
  args: {
    initialIncomes: 5000,
    initialExpenses: 2000,
  },
  play: async ({ canvas }) => {
    await expect(getIncomesInput(canvas)).toHaveValue("5,000");
    await expect(getExpensesInput(canvas)).toHaveValue("2,000");
    await expect(getBalanceOutput(canvas)).toHaveTextContent("3,000");
  },
};

export const NegativeBalance: Story = {
  args: {
    initialIncomes: 1000,
    initialExpenses: 1500,
  },
};

export const ZeroBalance: Story = {
  args: {
    initialIncomes: 3000,
    initialExpenses: 3000,
  },
};

export const Empty: Story = {
  play: async ({ canvas }) => {
    await expect(getIncomesInput(canvas)).toHaveValue("0");
    await expect(getExpensesInput(canvas)).toHaveValue("0");
    await expect(getBalanceOutput(canvas)).toHaveTextContent("0");
  },
};

export const CalculatingBalance: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(getIncomesInput(canvas), "3000");
    await userEvent.tab();

    await userEvent.type(getExpensesInput(canvas), "1000");
    await userEvent.tab();

    await expect(getBalanceOutput(canvas)).toHaveTextContent("2,000");
  },
};

function getIncomesInput(canvas: Canvas) {
  return canvas.getByLabelText("Incomes");
}

function getExpensesInput(canvas: Canvas) {
  return canvas.getByLabelText("Expenses");
}

function getBalanceOutput(canvas: Canvas) {
  return canvas.getByRole("status", { name: "Balance" });
}
