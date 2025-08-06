import { createBackupSummary } from "./restore";
import type { BackupData } from "../schemas";
import classes from "./BackupSummarySection.module.css";

type Props = {
  data: BackupData;
};

export function BackupSummarySection({ data }: Props) {
  const summary = createBackupSummary(data);

  return (
    <div className={classes.root}>
      <p className={classes.title}>Backup information</p>
      <div className={classes.meta}>
        <p>Version: {summary.version}</p>
        <p>Date: {new Date(summary.exportedAt).toLocaleDateString()}</p>
      </div>
      <div className={classes.details}>
        <div className={classes.group}>
          <p className={classes.groupTitle}>Income</p>
          <p>Items: {summary.incomeItemsCount}</p>
          <p>Categories: {summary.incomeCategoriesCount}</p>
        </div>
        <div className={classes.divider} />
        <div className={classes.group}>
          <p className={classes.groupTitle}>Expenses</p>
          <p>Items: {summary.expenseItemsCount}</p>
          <p>Categories: {summary.expenseCategoriesCount}</p>
        </div>
      </div>
    </div>
  );
}
