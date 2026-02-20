import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { MemoryRouter } from "react-router-dom";
import { AppShell } from "../src/components/AppShell";

interface StorybookProvidersProps {
  children: React.ReactNode;
}

export function StorybookProviders({ children }: StorybookProvidersProps) {
  return (
    <MantineProvider>
      <Notifications />
      <MemoryRouter>
        <AppShell>{children}</AppShell>
      </MemoryRouter>
    </MantineProvider>
  );
}
