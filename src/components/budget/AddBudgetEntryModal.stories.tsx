import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AddBudgetEntryModal } from "./AddBudgetEntryModal";
import { expect, fn, screen } from "storybook/test";

const meta = {
  title: "Components/AddBudgetEntryModal",
  component: AddBudgetEntryModal,
  args: {
    title: "Add Budget Entry",
    isOpen: true,
    onSave: fn(),
    onClose: fn(),
  },
} satisfies Meta<typeof AddBudgetEntryModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async () => {
    await expect(getModalTitle()).toBeInTheDocument();
  },
};

export const Cancelling: Story = {
  play: async ({ userEvent, args }) => {
    await userEvent.click(getCancelButton());

    await expect(args.onClose).toHaveBeenCalled();
  },
};

export const Closing: Story = {
  play: async ({ userEvent, args }) => {
    await userEvent.click(getCloseButton());

    await expect(args.onClose).toHaveBeenCalled();
  },
};

export const AddingEntry: Story = {
  play: async ({ userEvent, args }) => {
    await userEvent.type(getAmountInput(), "100");
    await userEvent.click(getSaveButton());

    await expect(args.onSave).toHaveBeenCalledWith(100);
  },
};

export const AddingEmptyEntry: Story = {
  play: async ({ userEvent, args }) => {
    await userEvent.click(getSaveButton());

    await expect(args.onSave).toHaveBeenCalledWith(0);
  },
};

function getCancelButton() {
  return screen.getByRole("button", { name: "Cancel" });
}

function getSaveButton() {
  return screen.getByRole("button", { name: "Save" });
}

function getCloseButton() {
  return screen.getByRole("button", { name: "Close" });
}

function getAmountInput() {
  return screen.getByLabelText("Amount");
}

function getModalTitle() {
  return screen.getByText("Add Budget Entry");
}
