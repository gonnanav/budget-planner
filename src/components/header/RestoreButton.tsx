"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Upload } from "lucide-react";
import { RestoreConfirmModal } from "@/components/modals/RestoreConfirmModal";
import { restoreBackupToDb } from "@/lib/backup-restore";

export function RestoreButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        aria-label="Restore data"
        size="sm"
        isIconOnly
        onPress={() => setIsOpen(true)}
      >
        <Upload size={16} />
      </Button>
      <RestoreConfirmModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onConfirm={restoreBackupToDb}
      />
    </>
  );
}
