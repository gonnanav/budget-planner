"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { addToast } from "@heroui/toast";
import { Download } from "lucide-react";
import { backupData } from "lib/backup-restore";
import styles from "./BackupSection.module.css";

export function BackupSection() {
  const [isLoading, setIsLoading] = useState(false);

  const handleBackup = async () => {
    setIsLoading(true);
    try {
      await backupData();
      addToast({
        title: "Backup downloaded",
        description: "Your budget data has been saved to a file.",
        color: "success",
      });
    } catch (error) {
      addToast({
        title: "Backup failed",
        description:
          error instanceof Error ? error.message : "Failed to create backup",
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.root}>
      <h2 className={styles.title}>Backup</h2>
      <p className={styles.description}>
        Download a JSON file containing all your incomes, expenses, and
        categories.
      </p>
      <div>
        <Button
          color="primary"
          startContent={<Download size={16} />}
          onPress={handleBackup}
          isLoading={isLoading}
        >
          Download backup
        </Button>
      </div>
    </section>
  );
}
