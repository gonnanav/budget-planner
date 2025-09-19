import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn } from "storybook/test";
import { BudgetSection } from "./BudgetSection";
import { createBudgetEntry } from "./budget-entries";

const meta = {
  title: "Components/BudgetSection",
  component: BudgetSection,
  args: {
    items: [],
    title: "Budget Section",
    itemLabel: "Entry",
    addItemButtonLabel: "Add entry",
    onAddEntry: fn(),
    onUpdateEntry: fn(),
    onDeleteEntry: fn(),
  },
} satisfies Meta<typeof BudgetSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      createBudgetEntry(100),
      createBudgetEntry(200),
      createBudgetEntry(300),
    ],
  },
};

export const Empty: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("No entries yet")).toBeInTheDocument();
  },
};
