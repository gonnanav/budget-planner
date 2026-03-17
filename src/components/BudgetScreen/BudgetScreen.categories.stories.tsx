import type { Meta, StoryObj } from "@storybook/react-vite";
import { BudgetServiceContext } from "contexts/BudgetServiceContext";
import {
  noCategoriesBudget,
  emptyCategoriesBudget,
  mixedCategoriesBudget,
} from "fixtures/budget";
import { BudgetScreen } from "./BudgetScreen";

const meta: Meta<typeof BudgetScreen> = {
  title: "Budget Screen/Categories",
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

export const NoCategories: Story = {
  decorators: [
    (Story) => (
      <BudgetServiceContext
        value={{
          ...baseBudgetService,
          getBudget: async () => noCategoriesBudget,
        }}
      >
        <Story />
      </BudgetServiceContext>
    ),
  ],
};

export const EmptyCategories: Story = {
  decorators: [
    (Story) => (
      <BudgetServiceContext
        value={{
          ...baseBudgetService,
          getBudget: async () => emptyCategoriesBudget,
        }}
      >
        <Story />
      </BudgetServiceContext>
    ),
  ],
};

export const MixedCategories: Story = {
  decorators: [
    (Story) => (
      <BudgetServiceContext
        value={{
          ...baseBudgetService,
          getBudget: async () => mixedCategoriesBudget,
        }}
      >
        <Story />
      </BudgetServiceContext>
    ),
  ],
};
