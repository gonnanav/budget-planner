import { createContext } from "react";

export interface DataBackupRestoreContextValue {
  backupData: () => void;
  restoreData: () => void;
}

export const DataBackupRestoreContext =
  createContext<DataBackupRestoreContextValue>({
    backupData: () => {},
    restoreData: () => {},
  });
