import { Header } from "@/components/header";
import { NavTabs } from "./NavTabs";
import type { BackupData } from "@/lib/backup-restore";
import type { TabKey } from "./types";

interface AppShellProps {
  selectedTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  onBackup: () => void;
  onRestore: (backup: BackupData) => Promise<void>;
  children: React.ReactNode;
}

export function AppShell({
  selectedTab,
  onTabChange,
  onBackup,
  onRestore,
  children,
}: AppShellProps) {
  return (
    <div className="flex flex-col gap-5 p-4">
      <Header onBackup={onBackup} onRestore={onRestore} />
      <NavTabs selectedTab={selectedTab} onTabChange={onTabChange} />
      <main className="w-full max-w-5xl mx-auto">{children}</main>
    </div>
  );
}
