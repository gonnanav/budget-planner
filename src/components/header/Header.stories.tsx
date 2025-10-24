import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent } from "storybook/test";
import { Header } from "./Header";
import { DataBackupRestoreContext } from "@/contexts/DataBackupRestoreContext";

const meta = {
  component: Header,
  parameters: {
    onBackup: fn(),
    onRestore: fn(),
  },
  decorators: [
    (Story, { parameters: { onBackup, onRestore } }) => (
      <DataBackupRestoreContext
        value={{ backupData: onBackup, restoreData: onRestore }}
      >
        <Story />
      </DataBackupRestoreContext>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, parameters: { onBackup, onRestore } }) => {
    const backupButton = canvas.getByRole("button", { name: "Backup data" });
    await userEvent.click(backupButton);
    await expect(onBackup).toHaveBeenCalled();

    const restoreButton = canvas.getByRole("button", { name: "Restore data" });
    await userEvent.click(restoreButton);
    await expect(onRestore).toHaveBeenCalled();
  },
};
