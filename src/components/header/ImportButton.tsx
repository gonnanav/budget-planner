"use client";

import { useContext } from "react";
import { Button } from "@heroui/button";
import { Upload } from "lucide-react";
import { DataExportImportContext } from "@/contexts/DataExportImportContext";

export function ImportButton() {
  const { importData } = useContext(DataExportImportContext);

  return (
    <Button aria-label="Import data" size="sm" isIconOnly onPress={importData}>
      <Upload size={16} />
    </Button>
  );
}
