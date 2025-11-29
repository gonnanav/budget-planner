"use client";

import { usePathname } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { backupData, restoreBackupToDb } from "@/lib/backup-restore";

interface RootLayoutClientProps {
  children: React.ReactNode;
}

export function RootLayoutClient({ children }: RootLayoutClientProps) {
  const path = usePathname();

  return (
    <AppShell
      selectedTab={path}
      onBackup={backupData}
      onRestore={restoreBackupToDb}
    >
      {children}
    </AppShell>
  );
}
