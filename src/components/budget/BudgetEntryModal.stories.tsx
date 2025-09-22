import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BudgetEntryModal } from "./BudgetEntryModal";
import { expect, fn, screen } from "storybook/test";
import { createTestEntry } from "./core/test-utils";

const meta = {
  title: "Components/BudgetEntryModal",
  component: BudgetEntryModal,
  args: {
    title: "Budget Entry",
    isOpen: true,
    onSave: fn(),
    onClose: fn(),
  },
} satisfies Meta<typeof BudgetEntryModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AddEntry: Story = {
  args: {
    title: "Add Budget Entry",
  },
  play: async () => {
    await expect(screen.getByText("Add Budget Entry")).toBeInTheDocument();
    await expect(getAmountInput()).not.toHaveValue();
  },
};

export const UpdateEntry: Story = {
  args: {
    title: "Update Budget Entry",
    entry: createTestEntry({ amount: 123 }),
  },
  play: async () => {
    await expect(screen.getByText("Update Budget Entry")).toBeInTheDocument();
    await expect(getAmountInput()).toHaveValue("123");
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

    await expect(args.onSave).toHaveBeenCalledWith({ amount: 100 });
    await expect(getAmountInput()).not.toHaveValue();
  },
};

function getCancelButton() {
  return screen.getByRole("button", { name: "Cancel" });
}

function getSaveButton() {
  return screen.getByRole("button", { name: "Save" });
}

function getAmountInput() {
  return screen.getByLabelText("Amount");
}
