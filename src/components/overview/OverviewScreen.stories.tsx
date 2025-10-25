import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Canvas } from "storybook/internal/types";
import { OverviewScreen } from "./OverviewScreen";
import { formatAmount } from "@/lib/format";

const meta = {
  title: "Overview/OverviewScreen",
  component: OverviewScreen,
} satisfies Meta<typeof OverviewScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PositiveBalance: Story = {
  args: {
    income: formatAmount(5000),
    expense: formatAmount(2800),
    balance: formatAmount(2200),
    isGood: true,
  },
  play: async ({ canvas }) => {
    await expect(getSection(canvas, "Income")).toHaveTextContent(/5,000/);
    await expect(getSection(canvas, "Expenses")).toHaveTextContent(/2,800/);
    await expect(getSection(canvas, "Balance")).toHaveTextContent(/2,200/);
  },
};

export const NegativeBalance: Story = {
  args: {
    income: formatAmount(2800),
    expense: formatAmount(5000),
    balance: formatAmount(-2200),
    isGood: false,
  },
};

export const Balanced: Story = {
  args: {
    income: formatAmount(5000),
    expense: formatAmount(5000),
    balance: formatAmount(0),
    isGood: true,
  },
};

function getSection(canvas: Canvas, label: string) {
  return canvas.getByRole("region", { name: label });
}
