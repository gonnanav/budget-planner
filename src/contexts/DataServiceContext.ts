import { createContext } from "react";
import type { BackupData } from "domain/types";

interface DataService {
  backupData: () => Promise<void>;
  restoreData: (backup: BackupData) => Promise<void>;
}

function notProvided(): never {
  throw new Error("DataServiceContext not provided");
}

export const DataServiceContext = createContext<DataService>({
  backupData: notProvided,
  restoreData: notProvided,
});
