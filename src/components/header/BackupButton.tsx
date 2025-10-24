"use client";

import { useContext } from "react";
import { Button } from "@heroui/button";
import { Download } from "lucide-react";
import { DataBackupRestoreContext } from "@/contexts/DataBackupRestoreContext";

export function BackupButton() {
  const { backupData } = useContext(DataBackupRestoreContext);

  return (
    <Button aria-label="Backup data" size="sm" isIconOnly onPress={backupData}>
      <Download size={16} />
    </Button>
  );
}
