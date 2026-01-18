import { Header } from "./components/Header";
import type { BackupData } from "lib/backup-restore";
import styles from "./AppShell.module.css";

interface AppShellProps {
  onBackup: () => void;
  onRestore: (backup: BackupData) => Promise<void>;
  children: React.ReactNode;
}

export function AppShell({ onBackup, onRestore, children }: AppShellProps) {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <Header onBackup={onBackup} onRestore={onRestore} />
        </div>
      </div>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
