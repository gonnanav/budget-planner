import type { Meta, StoryObj } from "@storybook/react-vite";
import { ServicesContext } from "contexts/ServicesContext";
import { emptyBudget, populatedBudget } from "fixtures/budget";
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
  getBudget: async () => emptyBudget,
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
  getBudget: async () => populatedBudget,
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
