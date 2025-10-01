import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ExpensesPage } from "./ExpensesPage";
import { ExpensesProvider } from "@/providers/ExpensesProvider";
import { rent, groceries, diningOut } from "@/fixtures";

const meta = {
  component: ExpensesPage,
} satisfies Meta<typeof ExpensesPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <ExpensesProvider initialExpenses={[rent, groceries, diningOut]}>
        <Story />
      </ExpensesProvider>
    ),
  ],
};
