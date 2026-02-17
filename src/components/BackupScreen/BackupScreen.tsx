import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { BackupSection } from "./components/BackupSection";
import { RestoreSection } from "./components/RestoreSection";
import styles from "./BackupScreen.module.css";

export function BackupScreen() {
  return (
    <div className={styles.root}>
      <div className={styles.titleRow}>
        <Link to="/" className={styles.backLink} aria-label="Back to budget">
          <ArrowLeft size={20} />
        </Link>
        <h1>Backup & Restore</h1>
      </div>
      <div className={styles.grid}>
        <BackupSection />
        <RestoreSection />
      </div>
    </div>
  );
}
