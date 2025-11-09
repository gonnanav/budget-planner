import { Header } from "@/components/header";
import { NavTabs } from "./NavTabs";
import type { BackupData } from "@/lib/backup-restore";

interface AppLayoutProps {
  onBackup: () => void;
  onRestore: (backup: BackupData) => Promise<void>;
  children: React.ReactNode;
}

export function AppLayout({ onBackup, onRestore, children }: AppLayoutProps) {
  return (
    <div className="flex flex-col gap-5 p-4">
      <Header onBackup={onBackup} onRestore={onRestore} />
      <NavTabs />
      <main>{children}</main>
    </div>
  );
}
