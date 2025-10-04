"use client";

import { useContext } from "react";
import { Button } from "@heroui/button";
import { Download } from "lucide-react";
import { DataExportImportContext } from "@/contexts/DataExportImportContext";

export function ExportButton() {
  const { exportData } = useContext(DataExportImportContext);

  return (
    <Button aria-label="Export data" size="sm" isIconOnly onPress={exportData}>
      <Download size={16} />
    </Button>
  );
}
