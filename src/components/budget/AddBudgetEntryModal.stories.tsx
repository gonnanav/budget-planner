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
    await expect(getAmountInput()).not.toHaveValue();
  },
};

export const Cancelling: Story = {
  play: async ({ userEvent, args }) => {
    await userEvent.type(getAmountInput(), "100");
    await userEvent.click(getCancelButton());

    await expect(args.onClose).toHaveBeenCalled();
    await expect(getAmountInput()).not.toHaveValue();
  },
};

export const Saving: Story = {
  play: async ({ userEvent, args }) => {
    await userEvent.type(getAmountInput(), "100");
    await userEvent.click(getSaveButton());

    await expect(args.onSave).toHaveBeenCalledWith(100);
    await expect(getAmountInput()).not.toHaveValue();
  },
};

function getModalTitle() {
  return screen.getByText("Add Budget Entry");
}

function getCancelButton() {
  return screen.getByRole("button", { name: "Cancel" });
}

function getSaveButton() {
  return screen.getByRole("button", { name: "Save" });
}

function getAmountInput() {
  return screen.getByLabelText("Amount");
}
