import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Home from "./page";

const meta = {
  title: "Pages/Homepage",
  component: Home,
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
