"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
} from "@heroui/react";
import { addToast } from "@heroui/toast";
import { AlertTriangle } from "lucide-react";
import type { BackupData } from "lib/backup-restore";
import styles from "./RestoreConfirmModal.module.css";

interface BackupSummary {
  version: string;
  exportedAt: string;
  incomesCount: number;
  expensesCount: number;
  incomeCategoriesCount: number;
  expenseCategoriesCount: number;
}

interface RestoreConfirmModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: (backup: BackupData) => Promise<void>;
  onBackupFirst?: () => void;
}

export function RestoreConfirmModal({
  isOpen,
  onOpenChange,
  onConfirm,
  onBackupFirst,
}: RestoreConfirmModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [backup, setBackup] = useState<BackupData | null>(null);
  const [summary, setSummary] = useState<BackupSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [acknowledged, setAcknowledged] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);
    setBackup(null);
    setSummary(null);
    setAcknowledged(false);

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

  const handleConfirm = async () => {
    if (!backup) return;

    setIsLoading(true);
    try {
      await onConfirm(backup);
      addToast({
        title: "Data restored",
        description: "Your budget data has been restored from the backup.",
        color: "success",
      });
      onOpenChange(false);
      resetState();
    } catch (err) {
      addToast({
        title: "Restore failed",
        description: "Failed to restore backup",
        color: "danger",
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
    setAcknowledged(false);
  };

  const handleClose = () => {
    if (!isLoading) {
      resetState();
      onOpenChange(false);
    }
  };

  const isConfirmDisabled = !backup || !acknowledged || isLoading;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="lg"
      isDismissable={!isLoading}
      hideCloseButton={isLoading}
    >
      <ModalContent className={styles.root}>
        {() => (
          <>
            <ModalHeader className={styles.header}>
              Restore from backup
            </ModalHeader>
            <ModalBody>
              <div className={styles.banner}>
                <AlertTriangle className={styles.icon} />
                <div className={styles.bannerContent}>
                  <p className={styles.bannerTitle}>
                    This will completely replace your current data
                  </p>
                  <p className={styles.bannerText}>
                    All your existing incomes, expenses, and categories will be
                    permanently deleted and replaced with the backup data. This
                    cannot be undone.
                  </p>
                  {onBackupFirst && (
                    <Button
                      size="sm"
                      variant="flat"
                      color="danger"
                      onPress={onBackupFirst}
                    >
                      Create backup first
                    </Button>
                  )}
                </div>
              </div>

              <div className={styles.content}>
                <div>
                  <label htmlFor="backup-file" className={styles.label}>
                    Select backup file
                  </label>
                  <input
                    id="backup-file"
                    type="file"
                    accept=".json,application/json"
                    onChange={handleFileChange}
                    disabled={isLoading}
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
                      <p>
                        Date:{" "}
                        {new Date(summary.exportedAt).toLocaleDateString()}
                      </p>
                      <p>Incomes: {summary.incomesCount}</p>
                      <p>Expenses: {summary.expensesCount}</p>
                      <p>Income categories: {summary.incomeCategoriesCount}</p>
                      <p>
                        Expense categories: {summary.expenseCategoriesCount}
                      </p>
                    </div>
                  </div>
                )}

                {backup && (
                  <Checkbox
                    isSelected={acknowledged}
                    onValueChange={setAcknowledged}
                    isDisabled={isLoading}
                    size="sm"
                  >
                    I understand this will permanently replace all my current
                    data
                  </Checkbox>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="flat"
                onPress={handleClose}
                isDisabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                color="danger"
                onPress={handleConfirm}
                isLoading={isLoading}
                isDisabled={isConfirmDisabled}
              >
                Replace my data
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
