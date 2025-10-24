import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    const dataMenuButton = canvas.getByRole("button", {
      name: "Data actions",
    });
    await userEvent.click(dataMenuButton);

    const backupMenuItem = body.getByRole("menuitem", { name: /Backup data/i });
    await userEvent.click(backupMenuItem);
    await expect(body.getByText("Download backup")).toBeInTheDocument();

    await userEvent.click(dataMenuButton);
    const restoreMenuItem = body.getByRole("menuitem", {
      name: /Restore data/i,
    });
    await userEvent.click(restoreMenuItem);
    await expect(body.getByText("Restore from backup")).toBeInTheDocument();
  },
};
