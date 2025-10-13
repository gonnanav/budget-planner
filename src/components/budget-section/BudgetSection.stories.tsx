import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn } from "storybook/test";
import { Canvas } from "storybook/internal/types";
import { BudgetSection } from "./BudgetSection";
import { rent, groceries, diningOut } from "@/fixtures";

const meta = {
  component: BudgetSection,
  args: {
    entries: [],
    title: "Budget Section",
    itemLabel: "Entry",
    addItemButtonLabel: "Add entry",
    onAddEntry: fn(),
    onUpdateEntry: fn(),
    onDeleteEntry: fn(),
    onClickCategories: fn(),
  },
} satisfies Meta<typeof BudgetSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entries: [rent, groceries, diningOut],
  },
  play: async ({ canvas, args, userEvent }) => {
    await expect(canvas.getByRole("heading")).toHaveTextContent(
      /budget section/i,
    );
    await expect(getEntry(canvas, "Rent")).toBeInTheDocument();
    await expect(getEntry(canvas, "Groceries")).toBeInTheDocument();
    await expect(getEntry(canvas, "Dining Out")).toBeInTheDocument();

    await userEvent.click(canvas.getByRole("button", { name: "Categories" }));
    await expect(args.onClickCategories).toHaveBeenCalled();
  },
};

export const Empty: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/no entries yet/i)).toBeInTheDocument();
  },
};

function getEntry(canvas: Canvas, name: string) {
  return canvas.getByRole("article", { name });
}
