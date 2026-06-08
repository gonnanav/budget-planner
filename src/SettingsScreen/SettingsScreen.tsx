import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { BackupSection } from "./BackupSection/BackupSection";
import { RestoreSection } from "./RestoreSection/RestoreSection";
import classes from "./SettingsScreen.module.css";

export function SettingsScreen() {
  return (
    <div className={classes.root}>
      <div className={classes.titleRow}>
        <Link to="/" className={classes.backLink} aria-label="Back to budget">
          <ArrowLeft size={20} />
        </Link>
        <h1>Settings</h1>
      </div>
      <div className={classes.sections}>
        <BackupSection />
        <RestoreSection />
      </div>
    </div>
  );
}
