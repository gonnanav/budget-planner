

import { useState } from "react";
import { Modal, Button, Checkbox } from "@mantine/core";
import { AlertTriangle } from "lucide-react";
import { BackupSummarySection } from "./BackupSummarySection";
import { type BackupData } from "../schemas";
import classes from "./RestoreConfirmModal.module.css";

type RestoreConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  backupData: BackupData | null;
};

export function RestoreConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  backupData,
}: RestoreConfirmModalProps) {
  const [acknowledged, setAcknowledged] = useState(false);

  const handleClose = () => {
    if (!isLoading) {
      setAcknowledged(false);
      onClose();
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
        {backupData && <BackupSummarySection data={backupData} />}
        <div className={classes.banner}>
          <AlertTriangle className={classes.icon} />
          <div className={classes.bannerContent}>
            <p className={classes.bannerTitle}>
              This will completely replace your current data
            </p>
            <p className={classes.bannerText}>
              All your existing data will be permanently deleted and replaced
              with the backup data. This cannot be undone.
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
