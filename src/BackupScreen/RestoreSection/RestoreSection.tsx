import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useBackupFile } from "./useBackupFile";
import { restoreData } from "./restore";
import { RestoreConfirmModal } from "./RestoreConfirmModal";
import { BackupCard } from "../BackupCard/BackupCard";
import classes from "./RestoreSection.module.css";

export function RestoreSection() {
  const navigate = useNavigate();
  const { fileState, fileInputRef, loadFile, reset } = useBackupFile();
  const [isRestoring, setIsRestoring] = useState(false);

  useEffect(() => {
    if (fileState.status === "error") {
      notifications.show({
        title: "Invalid backup file",
        message: fileState.error,
        color: "red",
      });
    }
  }, [fileState]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    loadFile(file);
  };

  const handleRestore = async () => {
    if (fileState.status !== "loaded") return;

    setIsRestoring(true);
    try {
      await restoreData(fileState.backupData);
      notifications.show({
        title: "Data restored",
        message: "Your budget data has been restored from the backup.",
        color: "green",
      });
      navigate("/");
    } catch {
      notifications.show({
        title: "Restore failed",
        message: "Failed to restore backup",
        color: "red",
      });
    } finally {
      setIsRestoring(false);
    }
  };

  return (
    <BackupCard
      title="Restore"
      description="Restore your budget data from a previously exported backup file."
    >
      <div>
        <label htmlFor="backup-file" className={classes.label}>
          Select backup file
        </label>
        <input
          ref={fileInputRef}
          id="backup-file"
          type="file"
          accept=".json,application/json"
          onChange={handleFileChange}
          className={classes.fileInput}
        />
      </div>

      <RestoreConfirmModal
        isOpen={fileState.status === "loaded"}
        onClose={reset}
        onConfirm={handleRestore}
        isLoading={isRestoring}
        backupData={fileState.status === "loaded" ? fileState.backupData : null}
      />
    </BackupCard>
  );
}
