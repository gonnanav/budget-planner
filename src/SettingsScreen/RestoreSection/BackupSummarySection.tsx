import type { BackupData } from "../schemas";
import classes from "./BackupSummarySection.module.css";

type Props = {
  data: BackupData;
};

export function BackupSummarySection({ data }: Props) {
  const { version, exportedAt } = data.metadata;

  return (
    <div className={classes.root}>
      <p className={classes.title}>Backup information</p>
      <div className={classes.meta}>
        <p>Version: {version}</p>
        <p>Date: {new Date(exportedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
