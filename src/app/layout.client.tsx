"use client";

import { usePathname } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { backupData, restoreBackupToDb } from "@/lib/backup-restore";
import type { TabKey } from "@/components/app-shell";

interface RootLayoutClientProps {
  children: React.ReactNode;
}

export function RootLayoutClient({ children }: RootLayoutClientProps) {
  const selectedTab = useSelectedTab();

  return (
    <AppShell
      selectedTab={selectedTab}
      onBackup={backupData}
      onRestore={restoreBackupToDb}
    >
      {children}
    </AppShell>
  );
}

function useSelectedTab(): TabKey {
  const path = usePathname();

  if (path.startsWith("/income")) return "income";
  else if (path.startsWith("/expenses")) return "expenses";

  return "overview";
}
