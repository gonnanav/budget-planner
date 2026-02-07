"use client";

import { useState } from "react";
import { Modal, Button, Checkbox } from "@mantine/core";
import { AlertTriangle } from "lucide-react";
import styles from "./RestoreConfirmModal.module.css";

interface RestoreConfirmModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export function RestoreConfirmModal({
  isOpen,
  onOpenChange,
  onConfirm,
  isLoading,
}: RestoreConfirmModalProps) {
  const [acknowledged, setAcknowledged] = useState(false);

  const handleClose = () => {
    if (!isLoading) {
      setAcknowledged(false);
      onOpenChange(false);
    }
  };

  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      size="lg"
      closeOnClickOutside={!isLoading}
      withCloseButton={!isLoading}
      title="Confirm restore"
    >
      <div className={styles.root}>
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
          </div>
        </div>

        <Checkbox
          checked={acknowledged}
          onChange={(e) => setAcknowledged(e.currentTarget.checked)}
          disabled={isLoading}
          size="sm"
          label="I understand this will permanently replace all my current data"
        />

        <div className={styles.footer}>
          <Button
            variant="subtle"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            color="red"
            onClick={onConfirm}
            loading={isLoading}
            disabled={!acknowledged || isLoading}
          >
            Replace my data
          </Button>
        </div>
      </div>
    </Modal>
  );
}
