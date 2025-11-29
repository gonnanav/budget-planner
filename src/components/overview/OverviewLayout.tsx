import { ReactNode } from "react";
import { AppShell } from "@/components/app-shell";
import { BackupData } from "@/lib/backup-restore";

interface OverviewLayoutProps {
  heading: ReactNode;
  banner: ReactNode;
  cards: ReactNode;
  onBackup: () => Promise<void>;
  onRestore: (data: BackupData) => Promise<void>;
}

export function OverviewLayout({
  heading,
  banner,
  cards,
  onBackup,
  onRestore,
}: OverviewLayoutProps) {
  return (
    <AppShell selectedTab="overview" onBackup={onBackup} onRestore={onRestore}>
      <div className="space-y-4">
        {heading}
        {banner}
        <div className="grid grid-cols-2 gap-3">{cards}</div>
      </div>
    </AppShell>
  );
}
