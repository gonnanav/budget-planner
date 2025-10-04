import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent } from "storybook/test";
import { Header } from "./Header";
import { DataExportImportContext } from "@/contexts/DataExportImportContext";

const meta = {
  component: Header,
  parameters: {
    onExport: fn(),
  },
  decorators: [
    (Story, { parameters: { onExport } }) => (
      <DataExportImportContext value={{ exportData: onExport }}>
        <Story />
      </DataExportImportContext>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, parameters: { onExport } }) => {
    const button = canvas.getByRole("button", { name: "Export data" });
    await userEvent.click(button);

    await expect(onExport).toHaveBeenCalled();
  },
};
