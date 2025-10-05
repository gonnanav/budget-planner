import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent } from "storybook/test";
import { Header } from "./Header";
import { DataExportImportContext } from "@/contexts/DataExportImportContext";

const meta = {
  component: Header,
  parameters: {
    onExport: fn(),
    onImport: fn(),
  },
  decorators: [
    (Story, { parameters: { onExport, onImport } }) => (
      <DataExportImportContext
        value={{ exportData: onExport, importData: onImport }}
      >
        <Story />
      </DataExportImportContext>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, parameters: { onExport, onImport } }) => {
    const exportButton = canvas.getByRole("button", { name: "Export data" });
    await userEvent.click(exportButton);
    await expect(onExport).toHaveBeenCalled();

    const importButton = canvas.getByRole("button", { name: "Import data" });
    await userEvent.click(importButton);
    await expect(onImport).toHaveBeenCalled();
  },
};
