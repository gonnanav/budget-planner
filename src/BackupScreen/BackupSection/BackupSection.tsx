

import { useState } from "react";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Download } from "lucide-react";
import { backupData } from "./backup";
import { BackupCard } from "../BackupCard/BackupCard";
import classes from "./BackupSection.module.css";

export function BackupSection() {
  const [isLoading, setIsLoading] = useState(false);

  const handleBackup = async () => {
    setIsLoading(true);
    try {
      await backupData();
    } catch {
      notifications.show({
        title: "Backup failed",
        message: "Failed to create backup",
        color: "red",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BackupCard
      title="Backup"
      description="Download a backup file containing all of your budget data."
    >
      <Button
        className={classes.backupButton}
        leftSection={<Download size={16} />}
        onClick={handleBackup}
        loading={isLoading}
      >
        Download backup
      </Button>
    </BackupCard>
  );
}
