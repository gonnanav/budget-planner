import { useState } from "react";
import { HeroUIProvider } from "@heroui/react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PathnameContext } from "@/contexts/PathnameContext";
import { NavTabs } from "./NavTabs";

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
};

export const Income: Story = {
  parameters: {
    pathname: "/income",
  },
};

export const Expenses: Story = {
  parameters: {
    pathname: "/expenses",
  },
};
