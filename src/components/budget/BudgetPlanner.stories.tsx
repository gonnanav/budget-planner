import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
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
    initialIncomes: 5000,
    initialExpenses: [2000],
  },
  play: async ({ canvas }) => {
    await expect(getIncomesInput(canvas)).toHaveValue("5,000");
    await expect(getDefaultExpenseInput(canvas)).toHaveValue("2,000");
    await expect(getBalanceOutput(canvas)).toHaveTextContent("3,000");
  },
};

export const NegativeBalance: Story = {
  args: {
    initialIncomes: 1000,
    initialExpenses: [1500],
  },
};

export const ZeroBalance: Story = {
  args: {
    initialIncomes: 3000,
    initialExpenses: [3000],
  },
};

export const Pristine: Story = {
  play: async ({ canvas }) => {
    await expect(getIncomesInput(canvas)).toHaveValue("0");
    await expect(getDefaultExpenseInput(canvas)).toHaveValue("0");
    await expect(getBalanceOutput(canvas)).toHaveTextContent("0");
  },
};

export const MultipleExpenses: Story = {
  args: {
    initialIncomes: 10000,
    initialExpenses: [2000, 1000, 3000],
  },
  play: async ({ canvas }) => {
    await expect(getExpenseInput(canvas, 0)).toHaveValue("2,000");
    await expect(getExpenseInput(canvas, 1)).toHaveValue("1,000");
    await expect(getExpenseInput(canvas, 2)).toHaveValue("3,000");
  },
};

export const AddingExpenses: Story = {
  args: {
    initialIncomes: 5000,
  },
  play: async ({ canvas, userEvent }) => {
    await expect(getAllExpensesInputs(canvas)).toHaveLength(1);

    await userEvent.click(getAddExpenseButton(canvas));
    await expect(getAllExpensesInputs(canvas)).toHaveLength(2);
  },
};

export const RemovingExpenses: Story = {
  args: {
    initialIncomes: 4000,
    initialExpenses: [2000, 1000],
  },
  play: async ({ canvas, userEvent }) => {
    await expect(getAllExpensesInputs(canvas)).toHaveLength(2);

    await userEvent.click(getRemoveExpenseButton(canvas, 0));
    await expect(getAllExpensesInputs(canvas)).toHaveLength(1);
  },
};

export const CalculatingBalance: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(getIncomesInput(canvas), "3000");
    await userEvent.tab();

    await userEvent.type(getDefaultExpenseInput(canvas), "1000");
    await userEvent.tab();

    await expect(getBalanceOutput(canvas)).toHaveTextContent("2,000");
  },
};

function getIncomesInput(canvas: Canvas) {
  return canvas.getByLabelText("Incomes");
}

function getAllExpensesInputs(canvas: Canvas) {
  return canvas.getAllByLabelText(/^Expense \d+$/);
}

function getDefaultExpenseInput(canvas: Canvas) {
  return getExpenseInput(canvas, 0);
}

function getExpenseInput(canvas: Canvas, index: number) {
  return canvas.getByLabelText(`Expense ${index + 1}`);
}

function getAddExpenseButton(canvas: Canvas) {
  return canvas.getByRole("button", { name: "Add expense" });
}

function getRemoveExpenseButton(canvas: Canvas, index: number) {
  return canvas.getAllByRole("button", { name: "Remove expense" })[index];
}

function getBalanceOutput(canvas: Canvas) {
  return canvas.getByRole("status", { name: "Balance" });
}
