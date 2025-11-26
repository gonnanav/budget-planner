import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { CategoryListItem } from "./CategoryListItem";
import { bills } from "@/fixtures/expense-categories";

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
    name: "Bills",
    amount: 2325,
  },
};

export const LargeAmountAndLongName: Story = {
  args: {
    name: "This is a very long category name that should test overflow and wrapping in the CategoryListItem component for visual robustness",
    amount: 1000000000,
  },
};
