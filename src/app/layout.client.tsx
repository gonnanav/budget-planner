"use client";

import { usePathname, useRouter } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { backupData, restoreBackupToDb } from "@/lib/backup-restore";
import type { TabKey } from "@/components/app-shell";
import { useEffect, useState, useMemo } from "react";

interface RootLayoutClientProps {
  children: React.ReactNode;
}

export function RootLayoutClient({ children }: RootLayoutClientProps) {
  const { selectedTab, onTabChange } = useSelectedTab();

  return (
    <AppShell
      selectedTab={selectedTab}
      onTabChange={onTabChange}
      onBackup={backupData}
      onRestore={restoreBackupToDb}
    >
      {children}
    </AppShell>
  );
}

function useSelectedTab(): {
  selectedTab: TabKey;
  onTabChange: (tab: TabKey) => void;
} {
  const path = usePathname();
  const pathTab = useMemo(() => getSelectedTabFromPath(path), [path]);
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<TabKey>(pathTab);

  const handleTabChange = (tab: TabKey) => {
    setSelectedTab(tab);
    router.push(`/${tab}`);
  };

  useEffect(() => {
    setSelectedTab(pathTab);
  }, [pathTab]);

  return { selectedTab, onTabChange: handleTabChange };
}

function getSelectedTabFromPath(path: string): TabKey {
  if (path.startsWith("/income")) return "income";
  else if (path.startsWith("/expenses")) return "expenses";
  else return "overview";
}
