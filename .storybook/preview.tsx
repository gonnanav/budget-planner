import React from "react";
import type { Preview } from "@storybook/nextjs-vite";
import { INITIAL_VIEWPORTS } from "storybook/viewport";
import { AppHeroUIProvider } from "../src/components/providers/AppHeroUIProvider";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
  },
  initialGlobals: {
    viewport: { value: "galaxys9", isRotated: false },
  },
  decorators: [
    (Story) => (
      <AppHeroUIProvider>
        <div style={{ height: "100vh" }}>
          <Story />
        </div>
      </AppHeroUIProvider>
    ),
  ],
};

export default preview;
