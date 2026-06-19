

import { useState } from "react";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Download } from "lucide-react";
import { backupData } from "../backup";
import { SettingsCard } from "../SettingsCard/SettingsCard";
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
    <SettingsCard
      title="Backup"
      description="Download a backup file of your budget data. Your data is stored only on this device, so back up to keep it safe or move it elsewhere."
    >
      <Button
        className={classes.backupButton}
        leftSection={<Download size={16} />}
        onClick={handleBackup}
        loading={isLoading}
      >
        Download backup
      </Button>
    </SettingsCard>
  );
}
