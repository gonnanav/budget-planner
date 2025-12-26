"use client";

import { AppShell } from "@/components/app-shell";
import { backupData, restoreBackupToDb } from "@/lib/backup-restore";

interface RootLayoutClientProps {
  children: React.ReactNode;
}

export function RootLayoutClient({ children }: RootLayoutClientProps) {
  return (
    <AppShell onBackup={backupData} onRestore={restoreBackupToDb}>
      {children}
    </AppShell>
  );
}
