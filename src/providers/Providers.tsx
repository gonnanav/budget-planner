"use client";

import { HeroUIProvider } from "@heroui/react";
import { StorageProvider } from "./StorageProvider";

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <HeroUIProvider>
      <StorageProvider>{children}</StorageProvider>
    </HeroUIProvider>
  );
}
