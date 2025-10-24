"use client";

import { useContext } from "react";
import { Button } from "@heroui/button";
import { Upload } from "lucide-react";
import { DataBackupRestoreContext } from "@/contexts/DataBackupRestoreContext";

export function RestoreButton() {
  const { restoreData } = useContext(DataBackupRestoreContext);

  return (
    <Button aria-label="Restore data" size="sm" isIconOnly onPress={restoreData}>
      <Upload size={16} />
    </Button>
  );
}
