"use client";

import { AppShell } from "components/AppShell";

interface RootLayoutClientProps {
  children: React.ReactNode;
}

export function RootLayoutClient({ children }: RootLayoutClientProps) {
  return <AppShell>{children}</AppShell>;
}
