import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { BackupSection } from "./components/BackupSection";
import { RestoreSection } from "./components/RestoreSection";
import classes from "./BackupScreen.module.css";

export function BackupScreen() {
  return (
    <div className={classes.root}>
      <div className={classes.titleRow}>
        <Link to="/" className={classes.backLink} aria-label="Back to budget">
          <ArrowLeft size={20} />
        </Link>
        <h1>Backup & Restore</h1>
      </div>
      <div className={classes.grid}>
        <BackupSection />
        <RestoreSection />
      </div>
    </div>
  );
}
