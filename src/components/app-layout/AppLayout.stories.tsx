import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AppLayout } from "./AppLayout";
import { PathnameContext } from "@/contexts/PathnameContext";

const meta = {
  component: AppLayout,
  parameters: {
    layout: "full",
  },
  decorators: [
    (Story) => (
      <PathnameContext value="/overview">
        <Story />
      </PathnameContext>
    ),
  ],
} satisfies Meta<typeof AppLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-4 rounded-lg bg-gray-100">
        <p>Dynamic content goes here...</p>
      </div>
    ),
  },
};
