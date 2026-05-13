import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Upload } from "lucide-react";
import { useBackupFile } from "./useBackupFile";
import { restoreData } from "./restore";
import { BackupSummarySection } from "./BackupSummarySection";
import { RestoreConfirmModal } from "./RestoreConfirmModal";
import classes from "./RestoreSection.module.css";

export function RestoreSection() {
  const navigate = useNavigate();
  const { fileState, fileInputRef, loadFile } = useBackupFile();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    loadFile(file);
  };

  const openConfirmModal = () => setIsConfirmModalOpen(true);

  const handleRestore = async () => {
    if (fileState.status !== "loaded") return;

    setIsRestoring(true);
    try {
      await restoreData(fileState.backupData);
      setIsConfirmModalOpen(false);
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
    <section className={classes.root}>
      <h2 className={classes.title}>Restore</h2>
      <p className={classes.description}>
        Restore your budget data from a previously exported backup file.
      </p>

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

      {fileState.status === "error" && (
        <div className={classes.error}>
          <p className={classes.errorTitle}>Error</p>
          <p>{fileState.error}</p>
        </div>
      )}

      {fileState.status === "loaded" && (
        <>
          <BackupSummarySection data={fileState.backupData} />
          <Button
            className={classes.restoreButton}
            color="red"
            leftSection={<Upload size={16} />}
            onClick={openConfirmModal}
          >
            Restore from backup
          </Button>
        </>
      )}

      <RestoreConfirmModal
        isOpen={isConfirmModalOpen}
        onOpenChange={setIsConfirmModalOpen}
        onConfirm={handleRestore}
        isLoading={isRestoring}
      />
    </section>
  );
}
