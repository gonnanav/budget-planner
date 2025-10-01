import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IncomePage } from "./IncomePage";
import { IncomesProvider } from "@/providers/IncomesProvider";
import { salary, allowance, investment } from "@/fixtures";

const meta = {
  component: IncomePage,
} satisfies Meta<typeof IncomePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <IncomesProvider initialIncomes={[salary, allowance, investment]}>
        <Story />
      </IncomesProvider>
    ),
  ],
};
