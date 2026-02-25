

import { useState, useContext } from "react";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Download } from "lucide-react";
import { BackupServiceContext } from "contexts/BackupServiceContext";
import classes from "./BackupSection.module.css";

export function BackupSection() {
  const backupService = useContext(BackupServiceContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleBackup = async () => {
    setIsLoading(true);
    try {
      await backupService.backupData();
      notifications.show({
        title: "Backup downloaded",
        message: "Your budget data has been saved to a file.",
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Backup failed",
        message:
          error instanceof Error ? error.message : "Failed to create backup",
        color: "red",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={classes.root}>
      <h2 className={classes.title}>Backup</h2>
      <p className={classes.description}>
        Download a JSON file containing all your incomes, expenses, and
        categories.
      </p>
      <div>
        <Button
          leftSection={<Download size={16} />}
          onClick={handleBackup}
          loading={isLoading}
        >
          Download backup
        </Button>
      </div>
    </section>
  );
}
