import { useState } from "react";
import { useDisclosure } from "@heroui/use-disclosure";
import { BudgetEntry, BudgetEntryInput } from "../core/types";

interface UseBudgetEntryDrawerProps {
  entries: BudgetEntry[];
  onAddEntry: (input: BudgetEntryInput) => void;
  onUpdateEntry: (index: number, input: BudgetEntryInput) => void;
  onDeleteEntry: (index: number) => void;
}

interface UseBudgetEntryDrawerReturn {
  isOpen: boolean;
  editedEntry: BudgetEntry | null;
  onEditEntry: (index: number) => void;
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
  const [editedEntryIndex, setEditedEntryIndex] = useState<number | null>(null);
  const editedEntry =
    editedEntryIndex === null ? null : entries[editedEntryIndex];

  const onEditEntry = (index: number) => {
    setEditedEntryIndex(index);
    onOpen();
  };

  const handleClose = () => {
    setEditedEntryIndex(null);
    onClose();
  };

  const onSave = (input: BudgetEntryInput) => {
    if (editedEntryIndex !== null) {
      onUpdateEntry(editedEntryIndex, input);
    } else {
      onAddEntry(input);
    }
  };

  const handleDeleteEntry = () => {
    if (editedEntryIndex === null) return;
    onDeleteEntry(editedEntryIndex);
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
