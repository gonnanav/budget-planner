import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AppLayout } from "./AppLayout";

const meta = {
  component: AppLayout,
} satisfies Meta<typeof AppLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div />,
  },
};
