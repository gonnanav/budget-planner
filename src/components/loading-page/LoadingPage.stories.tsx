import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LoadingPage } from "./LoadingPage";

const meta = {
  component: LoadingPage,
  parameters: {
    layout: "full",
  },
} satisfies Meta<typeof LoadingPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
