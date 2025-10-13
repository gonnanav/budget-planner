import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { CategoryEditForm } from "./CategoryEditForm";

const meta = {
  component: CategoryEditForm,
  args: {
    onSave: fn(),
    onCancel: fn(),
  },
} satisfies Meta<typeof CategoryEditForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialValue: "Entertainment",
  },
};

export const WithDelete: Story = {
  args: {
    initialValue: "Entertainment",
    onDelete: fn(),
  },
};

export const Empty: Story = {};
