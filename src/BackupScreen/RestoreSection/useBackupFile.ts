import { useState, useRef } from "react";
import { BackupDataSchema, type BackupData } from "../schemas";

type FileState =
  | { status: "idle" }
  | { status: "error"; error: string }
  | { status: "loaded"; backupData: BackupData };

type UseBackupFileResult = {
  fileState: FileState;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  loadFile: (file: File) => void;
  reset: () => void;
};

export function useBackupFile(): UseBackupFileResult {
  const [fileState, setState] = useState<FileState>({ status: "idle" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const backupData = BackupDataSchema.parse(
          JSON.parse(e.target?.result as string),
        );
        setState({ status: "loaded", backupData });
      } catch {
        setState({ status: "error", error: "The file is not a valid backup file" });
      }
    };

    reader.onerror = () => {
      setState({ status: "error", error: "Failed to read file" });
    };

    reader.readAsText(file);
  };

  const reset = () => {
    setState({ status: "idle" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return { fileState, fileInputRef, loadFile, reset };
}
