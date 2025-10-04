import { createContext } from "react";

export interface DataExportImportContextValue {
  exportData: () => void;
}

export const DataExportImportContext =
  createContext<DataExportImportContextValue>({
    exportData: () => {},
  });
