import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BudgetEntryModal } from "./BudgetEntryModal";
import { expect, fn, screen } from "storybook/test";

const meta = {
  title: "Components/BudgetEntryModal",
  component: BudgetEntryModal,
  args: {
    title: "Add Budget Entry",
    isOpen: true,
    onSave: fn(),
    onClose: fn(),
  },
} satisfies Meta<typeof BudgetEntryModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AddEntry: Story = {
  play: async () => {
    await expect(getAddEntryTitle()).toBeInTheDocument();
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

function getAddEntryTitle() {
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
