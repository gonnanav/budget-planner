import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { CategoryRow } from "./CategoryRow";

const meta = {
  component: CategoryRow,
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof CategoryRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    category: {
      id: "1",
      name: "Entertainment",
    },
  },
};

export const LongName: Story = {
  args: {
    category: {
      id: "1",
      name: "This is a very long category name that should test overflow and wrapping",
    },
  },
};
