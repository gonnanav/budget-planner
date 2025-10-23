import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { CategoryListItem } from "./CategoryListItem";
import { bills, transportation } from "@/fixtures/expense-categories";
import {
  electricity,
  water,
  gas,
  diningOut,
  hobbies,
} from "@/fixtures/expenses";
import { calculateCategoryTotal } from "@/core/budget-balance";

const meta = {
  component: CategoryListItem,
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof CategoryListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: bills.name,
    amount: calculateCategoryTotal(bills.id, [electricity, water, gas]),
  },
};

export const Empty: Story = {
  args: {
    name: transportation.name,
    amount: calculateCategoryTotal(transportation.id, []),
  },
};

export const LargeAmountAndLongName: Story = {
  args: {
    name: "This is a very long category name that should test overflow and wrapping in the CategoryListItem component for visual robustness",
    amount: calculateCategoryTotal("long-name", [
      {
        ...diningOut,
        amount: 999999999.99,
        categoryId: "long-name",
      },
      {
        ...hobbies,
        amount: 888888888.88,
        categoryId: "long-name",
      },
    ]),
  },
};
