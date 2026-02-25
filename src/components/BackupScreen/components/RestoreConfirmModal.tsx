

import { useState } from "react";
import { Modal, Button, Checkbox } from "@mantine/core";
import { AlertTriangle } from "lucide-react";
import classes from "./RestoreConfirmModal.module.css";

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
      <div className={classes.root}>
        <div className={classes.banner}>
          <AlertTriangle className={classes.icon} />
          <div className={classes.bannerContent}>
            <p className={classes.bannerTitle}>
              This will completely replace your current data
            </p>
            <p className={classes.bannerText}>
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

        <div className={classes.footer}>
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
