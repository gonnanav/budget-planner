

import { useState, useRef, useContext } from "react";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Upload } from "lucide-react";
import { ServicesContext } from "contexts/ServicesContext";
import type { BackupData } from "domain/types";
import { RestoreConfirmModal } from "./RestoreConfirmModal";
import styles from "./RestoreSection.module.css";

interface BackupSummary {
  version: string;
  exportedAt: string;
  incomesCount: number;
  expensesCount: number;
  incomeCategoriesCount: number;
  expenseCategoriesCount: number;
}

export function RestoreSection() {
  const { dataService } = useContext(ServicesContext);
  const [backup, setBackup] = useState<BackupData | null>(null);
  const [summary, setSummary] = useState<BackupSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);
    setBackup(null);
    setSummary(null);

    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content) as BackupData;

        if (!data.metadata || !data.data) {
          throw new Error("Invalid backup file structure");
        }

        if (
          !Array.isArray(data.data.incomeItems) ||
          !Array.isArray(data.data.expenseItems) ||
          !Array.isArray(data.data.incomeCategories) ||
          !Array.isArray(data.data.expenseCategories)
        ) {
          throw new Error("Invalid backup data format");
        }

        setBackup(data);
        setSummary({
          version: data.metadata.version,
          exportedAt: data.metadata.exportedAt,
          incomesCount: data.data.incomeItems.length,
          expensesCount: data.data.expenseItems.length,
          incomeCategoriesCount: data.data.incomeCategories.length,
          expenseCategoriesCount: data.data.expenseCategories.length,
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to parse backup file",
        );
      }
    };

    reader.onerror = () => {
      setError("Failed to read file");
    };

    reader.readAsText(file);
  };

  const handleRestore = async () => {
    if (!backup) return;

    setIsLoading(true);
    try {
      await dataService.restoreData(backup);
      notifications.show({
        title: "Data restored",
        message: "Your budget data has been restored from the backup.",
        color: "green",
      });
      setIsConfirmModalOpen(false);
      resetState();
    } catch (err) {
      notifications.show({
        title: "Restore failed",
        message: "Failed to restore backup",
        color: "red",
      });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setBackup(null);
    setSummary(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section className={styles.root}>
      <h2 className={styles.title}>Restore</h2>
      <p className={styles.description}>
        Replace all existing data with data from a backup file.
      </p>

      <div>
        <label htmlFor="backup-file" className={styles.label}>
          Select backup file
        </label>
        <input
          ref={fileInputRef}
          id="backup-file"
          type="file"
          accept=".json,application/json"
          onChange={handleFileChange}
          className={styles.fileInput}
        />
      </div>

      {error && (
        <div className={styles.error}>
          <p className={styles.errorTitle}>Error</p>
          <p>{error}</p>
        </div>
      )}

      {summary && (
        <div className={styles.summary}>
          <p className={styles.summaryTitle}>Backup information</p>
          <div className={styles.summaryGrid}>
            <p>Version: {summary.version}</p>
            <p>Date: {new Date(summary.exportedAt).toLocaleDateString()}</p>
            <p>Incomes: {summary.incomesCount}</p>
            <p>Expenses: {summary.expensesCount}</p>
            <p>Income categories: {summary.incomeCategoriesCount}</p>
            <p>Expense categories: {summary.expenseCategoriesCount}</p>
          </div>
        </div>
      )}

      {backup && (
        <div>
          <Button
            color="red"
            leftSection={<Upload size={16} />}
            onClick={() => setIsConfirmModalOpen(true)}
          >
            Restore from backup
          </Button>
        </div>
      )}

      <RestoreConfirmModal
        isOpen={isConfirmModalOpen}
        onOpenChange={setIsConfirmModalOpen}
        onConfirm={handleRestore}
        isLoading={isLoading}
      />
    </section>
  );
}
