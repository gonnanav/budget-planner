import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { ExpensesPage } from "./ExpensesPage";
import { rent, groceries, diningOut } from "@/fixtures";
import { ExpenseContext } from "@/contexts/ExpenseContext";

const meta = {
  component: ExpensesPage,
} satisfies Meta<typeof ExpensesPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <ExpenseContext
        value={{
          expenses: [rent, groceries, diningOut],
          addExpense: () => {},
          updateExpense: () => {},
          deleteExpense: () => {},
        }}
      >
        <Story />
      </ExpenseContext>
    ),
  ],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("heading")).toHaveTextContent(/expenses/i);
  },
};
