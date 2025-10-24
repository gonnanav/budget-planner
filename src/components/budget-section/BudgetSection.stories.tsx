import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn } from "storybook/test";
import { Canvas } from "storybook/internal/types";
import { BudgetSection } from "./BudgetSection";
import {
  electricity,
  water,
  gas,
  diningOut,
  hobbies,
} from "@/fixtures/expenses";
import { bills, personal } from "@/fixtures/expense-categories";
import { enrichItem } from "@/core/budget-items";
import { enrichCategory } from "@/core/categories";

const meta = {
  component: BudgetSection,
  args: {
    items: [],
    categories: [],
    title: "Budget Section",
    onAddItem: fn(),
    onEditItem: fn(),
    onAddCategory: fn(),
    onEditCategory: fn(),
  },
} satisfies Meta<typeof BudgetSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [electricity, water, gas, diningOut, hobbies].map(enrichItem),
    categories: [bills, personal].map((category) =>
      enrichCategory(category, [electricity, water, gas, diningOut, hobbies]),
    ),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("heading")).toHaveTextContent(
      /budget section/i,
    );
    await expect(getItem(canvas, "Electricity")).toBeInTheDocument();
    await expect(getItem(canvas, "Water")).toBeInTheDocument();
    await expect(getItem(canvas, "Gas")).toBeInTheDocument();
    await expect(getItem(canvas, "Dining Out")).toBeInTheDocument();
    await expect(getItem(canvas, "Hobbies")).toBeInTheDocument();
  },
};

export const Categories: Story = {
  args: {
    items: [electricity, water, gas, diningOut, hobbies].map(enrichItem),
    categories: [bills, personal].map((category) =>
      enrichCategory(category, [electricity, water, gas, diningOut, hobbies]),
    ),
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("tab", { name: "Categories" }));

    await expect(getItem(canvas, "Bills")).toBeInTheDocument();
    await expect(getItem(canvas, "Personal")).toBeInTheDocument();
  },
};

export const Empty: Story = {
  args: {
    items: [],
    categories: [],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/no items yet/i)).toBeInTheDocument();
  },
};

function getItem(canvas: Canvas, name: string) {
  return canvas.getByText(name);
}
