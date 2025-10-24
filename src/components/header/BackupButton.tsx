"use client";

import { useContext, useState } from "react";
import { Button } from "@heroui/button";
import { Download } from "lucide-react";
import { DataBackupRestoreContext } from "@/contexts/DataBackupRestoreContext";
import { BackupConfirmModal } from "@/components/modals/BackupConfirmModal";

export function BackupButton() {
  const { backupData } = useContext(DataBackupRestoreContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        aria-label="Backup data"
        size="sm"
        isIconOnly
        onPress={() => setIsOpen(true)}
      >
        <Download size={16} />
      </Button>
      <BackupConfirmModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onConfirm={backupData}
      />
    </>
  );
}
