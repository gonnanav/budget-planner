import { ReactNode } from "react";
import { AppLayout } from "@/components/app-layout";
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
    <AppLayout selectedTab="overview" onBackup={onBackup} onRestore={onRestore}>
      <div className="space-y-4">
        {heading}
        {banner}
        <div className="grid grid-cols-2 gap-3">{cards}</div>
      </div>
    </AppLayout>
  );
}
