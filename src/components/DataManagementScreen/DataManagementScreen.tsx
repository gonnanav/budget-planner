

import { BackupSection } from "./components/BackupSection";
import { RestoreSection } from "./components/RestoreSection";
import styles from "./DataManagementScreen.module.css";

export function DataManagementScreen() {
  return (
    <div className={styles.root}>
      <BackupSection />
      <RestoreSection />
    </div>
  );
}
