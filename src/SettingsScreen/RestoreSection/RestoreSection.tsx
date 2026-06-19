import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FileButton } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Upload } from "lucide-react";
import { useBackupFile } from "./useBackupFile";
import { restoreData } from "../backup";
import { RestoreConfirmModal } from "./RestoreConfirmModal";
import { SettingsCard } from "../SettingsCard/SettingsCard";
import classes from "./RestoreSection.module.css";

export function RestoreSection() {
  const navigate = useNavigate();
  const { fileState, resetRef, loadFile, reset } = useBackupFile();
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

  const handleSelectFile = (file: File | null) => {
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
    <SettingsCard
      title="Restore"
      description="Restore your budget data from a backup file. This replaces your current data."
    >
      <FileButton resetRef={resetRef} accept=".json,application/json" onChange={handleSelectFile}>
        {(props) => (
          <Button
            {...props}
            className={classes.selectButton}
            leftSection={<Upload size={16} />}
          >
            Select backup file
          </Button>
        )}
      </FileButton>

      <RestoreConfirmModal
        isOpen={fileState.status === "loaded"}
        onClose={reset}
        onConfirm={handleRestore}
        isLoading={isRestoring}
        backupData={fileState.status === "loaded" ? fileState.backupData : null}
      />
    </SettingsCard>
  );
}
