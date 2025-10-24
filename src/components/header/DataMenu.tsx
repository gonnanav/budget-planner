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
import { BackupConfirmModal } from "@/components/modals/BackupConfirmModal";
import { RestoreConfirmModal } from "@/components/modals/RestoreConfirmModal";
import { DataBackupRestoreContext } from "@/contexts/DataBackupRestoreContext";
import { useContext } from "react";
import { restoreBackupToDb } from "@/lib/backup-restore";

export function DataMenu() {
  const { backupData } = useContext(DataBackupRestoreContext);
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
    <>
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
            className="text-danger"
          >
            Restore data
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <BackupConfirmModal
        isOpen={isBackupModalOpen}
        onOpenChange={setIsBackupModalOpen}
        onConfirm={backupData}
      />
      <RestoreConfirmModal
        isOpen={isRestoreModalOpen}
        onOpenChange={setIsRestoreModalOpen}
        onConfirm={restoreBackupToDb}
      />
    </>
  );
}
