import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EntryDrawer } from "./EntryDrawer";
import { expect, fn, screen } from "storybook/test";
import { salary } from "@/fixtures";

const meta = {
  component: EntryDrawer,
  args: {
    itemLabel: "Budget Entry",
    isOpen: true,
    onSave: fn(),
    onClose: fn(),
    onCancel: fn(),
  },
} satisfies Meta<typeof EntryDrawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AddEntry: Story = {
  args: {
    entry: null,
  },
  play: async () => {
    await expect(screen.getByText("Add Budget Entry")).toBeInTheDocument();
    await expect(getAmountInput()).not.toHaveValue();
  },
};

export const EditEntry: Story = {
  args: {
    entry: salary,
  },
  play: async () => {
    await expect(screen.getByText("Edit Budget Entry")).toBeInTheDocument();
    await expect(getAmountInput()).toHaveValue("5,000");
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
    await userEvent.type(getNameInput(), "Some entry");
    await userEvent.type(getAmountInput(), "100");
    await userEvent.click(getSaveButton());

    await expect(args.onSave).toHaveBeenCalledWith({
      name: "Some entry",
      amount: 100,
      frequency: "monthly",
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
