import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { IncomeSection } from "./IncomeSection";

const meta = {
  component: IncomeSection,
} satisfies Meta<typeof IncomeSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { source: "Salary", amount: 3500 },
      { source: "Freelance", amount: 800 },
      { source: "Interest", amount: 45 },
    ],
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};
