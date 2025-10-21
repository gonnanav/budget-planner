import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { CategoryListItem } from "./CategoryListItem";
import { bills, personal, transportation } from "@/fixtures/expense-categories";
import {
  electricity,
  water,
  gas,
  diningOut,
  hobbies,
} from "@/fixtures/expenses";

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
    category: bills,
    entries: [electricity, water, gas],
  },
};

export const Empty: Story = {
  args: {
    category: transportation,
    entries: [],
  },
};

export const LargeAmountAndLongName: Story = {
  args: {
    category: {
      id: "long-name",
      name: "This is a very long category name that should test overflow and wrapping in the CategoryListItem component for visual robustness",
    },
    entries: [
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
    ],
  },
};
