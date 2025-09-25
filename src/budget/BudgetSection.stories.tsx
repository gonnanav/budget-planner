import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn } from "storybook/test";
import { BudgetSection } from "./BudgetSection";
import { rent, groceries, diningOut } from "./core/fixtures";

const meta = {
  title: "Components/BudgetSection",
  component: BudgetSection,
  args: {
    entries: [],
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
    entries: [rent, groceries, diningOut],
  },
};

export const Empty: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("No entries yet")).toBeInTheDocument();
  },
};
