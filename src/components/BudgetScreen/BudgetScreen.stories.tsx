import type { Meta, StoryObj } from "@storybook/react-vite";
import { ServicesContext } from "contexts/ServicesContext";
import { expenseCategories } from "fixtures/expense-categories";
import { expenseItems } from "fixtures/expenses";
import { incomeItems } from "fixtures/incomes";
import { BudgetScreen } from "./BudgetScreen";

const meta: Meta<typeof BudgetScreen> = {
  component: BudgetScreen,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof BudgetScreen>;

const emptyBudgetService = {
  getItems: async () => [],
  getCategories: async () => [],
  addItem: async () => "",
  updateItem: async () => false,
  deleteItem: async () => {},
  addCategory: async () => "",
  updateCategory: async () => false,
  deleteCategory: async () => {},
};

const noopBackupService = {
  backupData: async () => {},
  restoreData: async () => {},
};

const populatedBudgetService = {
  ...emptyBudgetService,
  getItems: async (section: "income" | "expenses") =>
    section === "expenses" ? expenseItems : incomeItems,
  getCategories: async (section: "income" | "expenses") =>
    section === "expenses" ? expenseCategories : [],
};

export const Empty: Story = {
  decorators: [
    (Story) => (
      <ServicesContext
        value={{ budgetService: emptyBudgetService, backupService: noopBackupService }}
      >
        <Story />
      </ServicesContext>
    ),
  ],
};

export const WithData: Story = {
  decorators: [
    (Story) => (
      <ServicesContext
        value={{ budgetService: populatedBudgetService, backupService: noopBackupService }}
      >
        <Story />
      </ServicesContext>
    ),
  ],
};
