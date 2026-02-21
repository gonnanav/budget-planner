import type { Meta, StoryObj } from "@storybook/react-vite";
import { BudgetServiceContext } from "contexts/BudgetServiceContext";
import { surplusBudget } from "fixtures/budget";
import { salary } from "fixtures/incomeItems";
import { employment } from "fixtures/incomeCategories";
import type { EditState } from "domain/types";
import { BudgetScreen } from "./BudgetScreen";

const budgetService = {
  getBudget: async () => surplusBudget,
  addItem: async () => "",
  updateItem: async () => false,
  deleteItem: async () => {},
  addCategory: async () => "",
  updateCategory: async () => false,
  deleteCategory: async () => {},
};

const meta: Meta<typeof BudgetScreen> = {
  title: "Budget Screen/Edit",
  component: BudgetScreen,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <BudgetServiceContext value={budgetService}>
        <Story />
      </BudgetServiceContext>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof BudgetScreen>;

const createItemState: EditState = {
  mode: "create",
  entity: "item",
  draft: {
    section: "income",
    name: "",
    amount: null,
    frequency: "monthly",
    notes: "",
  },
};

const updateItemState: EditState = {
  mode: "update",
  entity: "item",
  draft: {
    id: salary.id,
    section: salary.section,
    name: salary.name,
    amount: salary.amount,
    frequency: salary.frequency,
    categoryId: salary.categoryId,
    notes: salary.notes,
  },
};

const createCategoryState: EditState = {
  mode: "create",
  entity: "category",
  draft: {
    section: "income",
    name: "",
  },
};

const updateCategoryState: EditState = {
  mode: "update",
  entity: "category",
  draft: {
    id: employment.id,
    section: employment.section,
    name: employment.name,
  },
};

export const CreateItem: Story = {
  args: { initialEditState: createItemState },
};

export const UpdateItem: Story = {
  args: { initialEditState: updateItemState },
};

export const CreateCategory: Story = {
  args: { initialEditState: createCategoryState },
};

export const UpdateCategory: Story = {
  args: { initialEditState: updateCategoryState },
};
