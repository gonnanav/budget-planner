"use client";

import { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Button } from "@heroui/button";
import { EllipsisVertical, Download, Upload } from "lucide-react";
import { BackupConfirmModal, RestoreConfirmModal } from "components/modals";
import type { BackupData } from "lib/backup-restore";
import styles from "./DataMenu.module.css";

interface DataMenuProps {
  onBackup: () => void;
  onRestore: (backup: BackupData) => Promise<void>;
}

export function DataMenu({ onBackup, onRestore }: DataMenuProps) {
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);

  const handleAction = (key: React.Key) => {
    if (key === "backup") {
      setIsBackupModalOpen(true);
    } else if (key === "restore") {
      setIsRestoreModalOpen(true);
    }
  };

  return (
    <div className={styles.root}>
      <Dropdown>
        <DropdownTrigger>
          <Button
            aria-label="Data actions"
            size="sm"
            isIconOnly
            variant="light"
          >
            <EllipsisVertical size={16} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Data actions" onAction={handleAction}>
          <DropdownItem
            key="backup"
            startContent={<Download size={16} />}
            description="Download all your data"
          >
            Backup data
          </DropdownItem>
          <DropdownItem
            key="restore"
            startContent={<Upload size={16} />}
            description="Replace all data with backup"
            color="danger"
            className={styles.danger}
          >
            Restore data
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <BackupConfirmModal
        isOpen={isBackupModalOpen}
        onOpenChange={setIsBackupModalOpen}
        onConfirm={onBackup}
      />
      <RestoreConfirmModal
        isOpen={isRestoreModalOpen}
        onOpenChange={setIsRestoreModalOpen}
        onConfirm={onRestore}
      />
    </div>
  );
}
