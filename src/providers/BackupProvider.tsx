import { BackupContext } from "@/contexts/BackupContext";
import { backupData, restoreBackupToDb } from "@/lib/backup-restore";

interface BackupProviderProps {
  children: React.ReactNode;
}

export function BackupProvider({ children }: BackupProviderProps) {
  return (
    <BackupContext value={{ backup: backupData, restore: restoreBackupToDb }}>
      {children}
    </BackupContext>
  );
}
