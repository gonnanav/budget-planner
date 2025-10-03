import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { IncomePage } from "./IncomePage";
import { salary, allowance, investment } from "@/fixtures";
import { IncomeContext } from "@/contexts/IncomeContext";

const meta = {
  component: IncomePage,
} satisfies Meta<typeof IncomePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <IncomeContext
        value={{
          incomes: [salary, allowance, investment],
          addIncome: () => {},
          updateIncome: () => {},
          deleteIncome: () => {},
        }}
      >
        <Story />
      </IncomeContext>
    ),
  ],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("heading")).toHaveTextContent(/income/i);
  },
};
