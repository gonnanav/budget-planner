import { BackupData } from "@/lib/backup-restore";
import { createContext } from "react";

export type BackupContextValue = {
  backup: () => Promise<void>;
  restore: (data: BackupData) => Promise<void>;
};

export const BackupContext = createContext<BackupContextValue>({
  backup: () => Promise.resolve(),
  restore: () => Promise.resolve(),
});
