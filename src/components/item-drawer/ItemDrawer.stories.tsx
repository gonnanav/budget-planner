import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ItemDrawer } from "./ItemDrawer";
import { expect, fn, screen } from "storybook/test";
import { salary } from "@/fixtures/incomes";

const meta = {
  component: ItemDrawer,
  args: {
    isOpen: true,
    categories: [],
    onSave: fn(),
    onClose: fn(),
    onCancel: fn(),
  },
} satisfies Meta<typeof ItemDrawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AddItem: Story = {
  args: {
    item: null,
  },
  play: async () => {
    await expect(screen.getByText("Add Item")).toBeInTheDocument();
    await expect(getAmountInput()).not.toHaveValue();
  },
};

export const EditItem: Story = {
  args: {
    item: salary,
  },
  play: async () => {
    await expect(screen.getByText("Edit Item")).toBeInTheDocument();
    await expect(getAmountInput()).toHaveDisplayValue(/5,000/);
  },
};

export const Cancelling: Story = {
  play: async ({ userEvent, args }) => {
    await userEvent.type(getAmountInput(), "100");
    await userEvent.click(getCancelButton());

    await expect(args.onCancel).toHaveBeenCalled();
    await expect(getAmountInput()).not.toHaveValue();
  },
};

export const Saving: Story = {
  play: async ({ userEvent, args }) => {
    await userEvent.type(getNameInput(), "Some item");
    await userEvent.type(getAmountInput(), "100");
    await userEvent.click(getSaveButton());

    await expect(args.onSave).toHaveBeenCalledWith({
      name: "Some item",
      amount: 100,
      frequency: "monthly",
      categoryId: undefined,
    });
    await expect(getAmountInput()).not.toHaveValue();
  },
};

function getCancelButton() {
  return screen.getByRole("button", { name: "Cancel" });
}

function getSaveButton() {
  return screen.getByRole("button", { name: "Save" });
}

function getNameInput() {
  return screen.getByLabelText("Name");
}

function getAmountInput() {
  return screen.getByLabelText("Amount");
}
