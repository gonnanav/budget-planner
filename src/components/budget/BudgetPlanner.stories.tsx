import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { BudgetPlanner } from './BudgetPlanner';

const meta = {
  title: "components/BudgetPlanner",
  component: BudgetPlanner,
} satisfies Meta<typeof BudgetPlanner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PositiveBalance: Story = {
  args: {
    initialIncomes: 5000,
    initialExpenses: 1500,
  },
};

export const NegativeBalance: Story = {
  args: {
    initialIncomes: 1000,
    initialExpenses: 1500,
  },
};

export const ZeroBalance: Story = {
  args: {
    initialIncomes: 3000,
    initialExpenses: 3000,
  },
};

export const Empty: Story = {};
