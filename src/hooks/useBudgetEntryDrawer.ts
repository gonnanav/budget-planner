import { useState } from "react";
import { useDisclosure } from "@heroui/use-disclosure";
import { BudgetEntry, BudgetEntryInput } from "@/core/types";

interface UseBudgetEntryDrawerProps {
  entries: BudgetEntry[];
  onAddEntry: (input: BudgetEntryInput) => void;
  onUpdateEntry: (id: string, input: BudgetEntryInput) => void;
  onDeleteEntry: (id: string) => void;
}

interface UseBudgetEntryDrawerReturn {
  isOpen: boolean;
  editedEntry: BudgetEntry | null;
  onEditEntry: (id: string) => void;
  onOpen: () => void;
  onClose: () => void;
  onSave: (input: BudgetEntryInput) => void;
  onDelete: () => void;
}

export function useBudgetEntryDrawer({
  entries,
  onAddEntry,
  onUpdateEntry,
  onDeleteEntry,
}: UseBudgetEntryDrawerProps): UseBudgetEntryDrawerReturn {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editedEntryId, setEditedEntryId] = useState<string | null>(null);
  const editedEntry =
    entries.find((entry) => entry.id === editedEntryId) ?? null;

  const onEditEntry = (id: string) => {
    setEditedEntryId(id);
    onOpen();
  };

  const handleClose = () => {
    setEditedEntryId(null);
    onClose();
  };

  const onSave = (input: BudgetEntryInput) => {
    if (editedEntryId !== null) {
      onUpdateEntry(editedEntryId, input);
    } else {
      onAddEntry(input);
    }
  };

  const handleDeleteEntry = () => {
    if (editedEntryId === null) return;
    onDeleteEntry(editedEntryId);
  };

  return {
    isOpen,
    editedEntry,
    onEditEntry,
    onOpen,
    onClose: handleClose,
    onSave,
    onDelete: handleDeleteEntry,
  };
}
