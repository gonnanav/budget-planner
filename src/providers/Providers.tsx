"use client";

import { ToastProvider } from "@heroui/toast";
import { AppHeroUIProvider } from "./AppHeroUIProvider";
import { BackupProvider } from "./BackupProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: Readonly<ProvidersProps>) {
  return (
    <AppHeroUIProvider>
      <BackupProvider>{children}</BackupProvider>
      <ToastProvider />
    </AppHeroUIProvider>
  );
}
