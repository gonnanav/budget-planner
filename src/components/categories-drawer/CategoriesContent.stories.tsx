import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, screen } from "storybook/test";
import { CategoriesContent } from "./CategoriesContent";
import { transportation, entertainment, shopping } from "@/fixtures/categories";

const meta = {
  component: CategoriesContent,
  args: {
    onAddCategory: fn(),
    onChangeCategory: fn(),
    onDeleteCategory: fn(),
  },
} satisfies Meta<typeof CategoriesContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    categories: [transportation, entertainment, shopping],
    isLoading: false,
  },
  play: async () => {
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

export const Edited: Story = {
  args: {
    categories: [transportation, entertainment, shopping],
    isLoading: false,
    initialEditedCategoryId: entertainment.id,
  },
};

export const EditingCategory: Story = {
  args: {
    categories: [transportation, entertainment, shopping],
    isLoading: false,
  },
  play: async ({ userEvent, args }) => {
    await userEvent.click(screen.getByText(transportation.name));

    const input = getNameInput();
    await userEvent.clear(input);
    await userEvent.type(input, "Transportation 2.0");

    await userEvent.click(getSaveButton());

    await expect(args.onChangeCategory).toHaveBeenCalledWith(
      transportation.id,
      "Transportation 2.0",
    );
  },
};

export const CancellingEdit: Story = {
  args: {
    categories: [transportation, entertainment],
    isLoading: false,
  },
  play: async ({ userEvent, args }) => {
    await userEvent.click(screen.getByText(transportation.name));

    const input = getNameInput();
    await userEvent.clear(input);
    await userEvent.type(input, "This will be cancelled");

    await userEvent.click(getCancelButton());

    await expect(args.onChangeCategory).not.toHaveBeenCalled();
    await expect(screen.getByText(transportation.name)).toBeInTheDocument();
  },
};

export const DeletingCategory: Story = {
  args: {
    categories: [transportation, entertainment],
    isLoading: false,
  },
  play: async ({ userEvent, args }) => {
    await userEvent.click(screen.getByText(transportation.name));
    await userEvent.click(getDeleteButton());

    await expect(args.onDeleteCategory).toHaveBeenCalledWith(transportation.id);
  },
};

export const AddingCategory: Story = {
  args: {
    categories: [transportation, entertainment],
    isLoading: false,
  },
  play: async ({ userEvent, args }) => {
    await userEvent.click(getAddButton());
    await userEvent.type(getNameInput(), "New Category");
    await userEvent.click(getSaveButton());

    await expect(args.onAddCategory).toHaveBeenCalledWith("New Category");
  },
};

function getNameInput() {
  return screen.getByLabelText("Name");
}

function getAddButton() {
  return screen.getByRole("button", { name: "Add Category" });
}

function getSaveButton() {
  return screen.getByRole("button", { name: "Save" });
}

function getCancelButton() {
  return screen.getByRole("button", { name: "Cancel" });
}

function getDeleteButton() {
  return screen.getByRole("button", { name: "Delete" });
}
