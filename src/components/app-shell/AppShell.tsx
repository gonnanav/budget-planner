import { Header } from "@/components/header";
import { NavTabs } from "./NavTabs";
import type { BackupData } from "@/lib/backup-restore";

interface AppShellProps {
  selectedTab: string;
  onBackup: () => void;
  onRestore: (backup: BackupData) => Promise<void>;
  children: React.ReactNode;
}

export function AppShell({
  selectedTab,
  onBackup,
  onRestore,
  children,
}: AppShellProps) {
  return (
    <div className="flex flex-col gap-5 p-4">
      <Header onBackup={onBackup} onRestore={onRestore} />
      <NavTabs selectedTab={selectedTab} />
      <main>{children}</main>
    </div>
  );
}
