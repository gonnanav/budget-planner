import type { Preview } from "@storybook/react-vite";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "../src/base.css";
import "../src/theme.css";
import { StorybookProviders } from "./StorybookProviders";

const preview: Preview = {
  decorators: [
    (Story) => (
      <StorybookProviders>
        <Story />
      </StorybookProviders>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
