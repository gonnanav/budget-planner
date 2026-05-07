import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ServiceProviders } from "./ServiceProviders";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: Readonly<ProvidersProps>) {
  return (
    <MantineProvider>
      <Notifications />
      <ServiceProviders>
        {children}
      </ServiceProviders>
    </MantineProvider>
  );
}
