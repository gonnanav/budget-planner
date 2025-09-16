import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn } from "storybook/test";
import { BudgetSection } from "./BudgetSection";

const meta = {
  title: "Components/BudgetSection",
  component: BudgetSection,
  args: {
    items: [],
    title: "Budget Section",
    itemLabel: "Entry",
    addItemButtonLabel: "Add entry",
    removeItemButtonLabel: "Remove entry",
    onChange: fn(),
  },
} satisfies Meta<typeof BudgetSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("No entries yet.")).toBeInTheDocument();
  },
};
