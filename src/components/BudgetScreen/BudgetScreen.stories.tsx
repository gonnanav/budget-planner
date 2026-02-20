import type { Meta, StoryObj } from "@storybook/react-vite";
import { BudgetServiceContext } from "contexts/BudgetServiceContext";
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

const populatedBudgetService = {
  ...emptyBudgetService,
  getBudget: async () => populatedBudget,
};

export const Empty: Story = {
  decorators: [
    (Story) => (
      <BudgetServiceContext value={emptyBudgetService}>
        <Story />
      </BudgetServiceContext>
    ),
  ],
};

export const WithData: Story = {
  decorators: [
    (Story) => (
      <BudgetServiceContext value={populatedBudgetService}>
        <Story />
      </BudgetServiceContext>
    ),
  ],
};
