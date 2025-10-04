import { createContext } from "react";

export interface DataExportImportContextValue {
  exportData: () => void;
  importData: () => void;
}

export const DataExportImportContext =
  createContext<DataExportImportContextValue>({
    exportData: () => {},
    importData: () => {},
  });
