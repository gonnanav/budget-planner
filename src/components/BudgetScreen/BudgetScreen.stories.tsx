import type { Meta, StoryObj } from "@storybook/react-vite";
import { BudgetServiceContext } from "contexts/BudgetServiceContext";
import {
  surplusBudget,
  deficitBudget,
  balancedBudget,
  emptyBudget,
} from "fixtures/budget";
import { BudgetScreen } from "./BudgetScreen";

const meta: Meta<typeof BudgetScreen> = {
  title: "Budget Screen",
  component: BudgetScreen,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof BudgetScreen>;

const baseBudgetService = {
  addItem: async () => "",
  updateItem: async () => false,
  deleteItem: async () => {},
  addCategory: async () => "",
  updateCategory: async () => false,
  deleteCategory: async () => {},
};

const surplusBudgetService = {
  ...baseBudgetService,
  getBudget: async () => surplusBudget,
};

const deficitBudgetService = {
  ...baseBudgetService,
  getBudget: async () => deficitBudget,
};

const balancedBudgetService = {
  ...baseBudgetService,
  getBudget: async () => balancedBudget,
};

const emptyBudgetService = {
  ...baseBudgetService,
  getBudget: async () => emptyBudget,
};

export const Surplus: Story = {
  decorators: [
    (Story) => (
      <BudgetServiceContext value={surplusBudgetService}>
        <Story />
      </BudgetServiceContext>
    ),
  ],
};

export const Deficit: Story = {
  decorators: [
    (Story) => (
      <BudgetServiceContext value={deficitBudgetService}>
        <Story />
      </BudgetServiceContext>
    ),
  ],
};

export const Balanced: Story = {
  decorators: [
    (Story) => (
      <BudgetServiceContext value={balancedBudgetService}>
        <Story />
      </BudgetServiceContext>
    ),
  ],
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
