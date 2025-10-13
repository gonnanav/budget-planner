import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CategoriesDrawer } from "./CategoriesDrawer";
import { expect, fn, screen } from "storybook/test";
import { transportation, entertainment, shopping } from "@/fixtures/categories";

const meta: Meta<typeof CategoriesDrawer> = {
  component: CategoriesDrawer,
  args: {
    isOpen: true,
    onClose: fn(),
    onChangeCategory: fn(),
    onDeleteCategory: fn(),
    onAddCategory: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    categories: [transportation, entertainment, shopping],
    isLoading: false,
  },
  play: async () => {
    await expect(screen.getByText("Categories")).toBeInTheDocument();
    await expect(screen.getByText(transportation.name)).toBeInTheDocument();
    await expect(screen.getByText(entertainment.name)).toBeInTheDocument();
    await expect(screen.getByText(shopping.name)).toBeInTheDocument();
  },
};

export const Loading: Story = {
  args: {
    categories: [],
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    categories: [],
    isLoading: false,
  },
  play: async () => {
    await expect(screen.getByText("No categories yet")).toBeInTheDocument();
  },
};
