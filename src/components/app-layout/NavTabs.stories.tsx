import { useState } from "react";
import { expect } from "storybook/test";
import { HeroUIProvider } from "@heroui/react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PathnameContext } from "@/contexts/PathnameContext";
import { NavTabs } from "./NavTabs";
import { Canvas } from "storybook/internal/types";

const meta = {
  component: NavTabs,
  decorators: [
    (Story, { parameters }) => {
      const [pathname, setPathname] = useState(parameters.pathname);

      return (
        <HeroUIProvider navigate={setPathname}>
          <PathnameContext value={pathname}>
            <Story />
          </PathnameContext>
        </HeroUIProvider>
      );
    },
  ],
} satisfies Meta<typeof NavTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  parameters: {
    pathname: "/overview",
  },
  play: async ({ canvas }) => {
    await expect(getTab(canvas, "Overview")).toHaveAttribute(
      "aria-selected",
      "true",
    );

    await expect(getTab(canvas, "Income")).toHaveAttribute(
      "aria-selected",
      "false",
    );

    await expect(getTab(canvas, "Expenses")).toHaveAttribute(
      "aria-selected",
      "false",
    );
  },
};

export const Income: Story = {
  parameters: {
    pathname: "/income",
  },
  play: async ({ canvas }) => {
    await expect(getTab(canvas, "Income")).toHaveAttribute(
      "aria-selected",
      "true",
    );
  },
};

export const Expenses: Story = {
  parameters: {
    pathname: "/expenses",
  },
};

function getTab(canvas: Canvas, name: string) {
  return canvas.getByRole("tab", { name });
}
