"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { addToast } from "@heroui/toast";
import styles from "./BackupConfirmModal.module.css";

interface BackupConfirmModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => void;
}

export function BackupConfirmModal({
  isOpen,
  onOpenChange,
  onConfirm,
}: BackupConfirmModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      addToast({
        title: "Backup downloaded",
        description: "Your budget data has been saved to a file.",
        color: "success",
      });
      onOpenChange(false);
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
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
      <ModalContent className={styles.root}>
        {(onClose) => (
          <>
            <ModalHeader className={styles.header}>Download backup</ModalHeader>
            <ModalBody>
              <p className={styles.description}>
                A JSON file containing all your budget data will be downloaded
                to your device.
              </p>
              <div className={styles.details}>
                <p>
                  <strong>Includes:</strong> All incomes, expenses, and
                  categories
                </p>
                <p>
                  <strong>Format:</strong> Plain JSON file
                </p>
                <p>
                  <strong>Privacy:</strong> Keep this file secure as it contains
                  your personal financial data
                </p>
              </div>
              <p className={styles.note}>
                No changes will be made to your current data.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onClose} isDisabled={isLoading}>
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={handleConfirm}
                isLoading={isLoading}
              >
                Download backup
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
