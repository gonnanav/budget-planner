import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: Readonly<ProvidersProps>) {
  return (
    <MantineProvider>
      <Notifications />
      {children}
    </MantineProvider>
  );
}
