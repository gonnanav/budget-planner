

import { BackupSection } from "./components/BackupSection";
import { RestoreSection } from "./components/RestoreSection";
import styles from "./BackupScreen.module.css";

export function BackupScreen() {
  return (
    <div className={styles.root}>
      <BackupSection />
      <RestoreSection />
    </div>
  );
}
