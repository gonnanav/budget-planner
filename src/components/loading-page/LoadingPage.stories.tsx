import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { LoadingPage } from "./LoadingPage";
import { AppLayout } from "@/components/app-layout";

const meta = {
  component: LoadingPage,
  parameters: {
    layout: "full",
  },
  decorators: [
    (Story) => (
      <AppLayout>
        <Story />
      </AppLayout>
    ),
  ],
} satisfies Meta<typeof LoadingPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
