import Link from "next/link";
import { DataMenu } from "./DataMenu";
import type { BackupData } from "@/lib/backup-restore";

interface HeaderProps {
  onBackup: () => void;
  onRestore: (backup: BackupData) => Promise<void>;
}

export function Header({ onBackup, onRestore }: HeaderProps) {
  return (
    <header className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Budget Planner
        </Link>
        <DataMenu onBackup={onBackup} onRestore={onRestore} />
      </div>
    </header>
  );
}
