import Link from "next/link";
import { DataMenu } from "../DataMenu/DataMenu";
import type { BackupData } from "lib/backup-restore";
import styles from "./Header.module.css";

interface HeaderProps {
  onBackup: () => void;
  onRestore: (backup: BackupData) => Promise<void>;
}

export function Header({ onBackup, onRestore }: HeaderProps) {
  return (
    <header className={styles.root}>
      <div className={styles.row}>
        <Link href="/" className={styles.title}>
          Budget Planner
        </Link>
        <DataMenu onBackup={onBackup} onRestore={onRestore} />
      </div>
    </header>
  );
}
