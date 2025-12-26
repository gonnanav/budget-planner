import { Header } from "@/components/header";
import type { BackupData } from "@/lib/backup-restore";

interface AppShellProps {
  onBackup: () => void;
  onRestore: (backup: BackupData) => Promise<void>;
  children: React.ReactNode;
}

export function AppShell({ onBackup, onRestore, children }: AppShellProps) {
  return (
    <div className="flex flex-col">
      <div className="border-b border-default-200/60">
        <div className="w-full p-4">
          <Header onBackup={onBackup} onRestore={onRestore} />
        </div>
      </div>

      <main className="w-full max-w-5xl mx-auto p-4">{children}</main>
    </div>
  );
}
