import { createContext } from "react";
import type { BackupData } from "domain/types";

export type BackupService = {
  backupData: () => Promise<void>;
  restoreData: (backup: BackupData) => Promise<void>;
};

function notProvided(): never {
  throw new Error("BackupServiceContext not provided");
}

export const BackupServiceContext = createContext<BackupService>({
  backupData: notProvided,
  restoreData: notProvided,
});
