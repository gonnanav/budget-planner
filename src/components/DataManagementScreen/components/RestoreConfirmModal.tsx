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
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="lg"
      isDismissable={!isLoading}
      hideCloseButton={isLoading}
    >
      <ModalContent className={styles.root}>
        {() => (
          <>
            <ModalHeader>Confirm restore</ModalHeader>
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
                </div>
              </div>

              <Checkbox
                isSelected={acknowledged}
                onValueChange={setAcknowledged}
                isDisabled={isLoading}
                size="sm"
              >
                I understand this will permanently replace all my current data
              </Checkbox>
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
                onPress={onConfirm}
                isLoading={isLoading}
                isDisabled={!acknowledged || isLoading}
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
