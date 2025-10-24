import { useState } from "react";
import { useDisclosure } from "@heroui/use-disclosure";
import { BudgetItem, BudgetItemInput } from "@/core/types";

interface UseBudgetItemDrawerProps {
  items: BudgetItem[];
  onAdd: (input: BudgetItemInput) => void;
  onUpdate: (id: string, input: BudgetItemInput) => void;
  onDelete: (id: string) => void;
}

interface UseBudgetItemDrawerReturn {
  isOpen: boolean;
  editedItem: BudgetItem | null;
  onEditItem: (id: string) => void;
  onOpen: () => void;
  onClose: () => void;
  onSave: (input: BudgetItemInput) => void;
  onDelete: () => void;
}

export function useBudgetItemDrawer({
  items,
  onAdd,
  onUpdate,
  onDelete,
}: UseBudgetItemDrawerProps): UseBudgetItemDrawerReturn {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editedItemId, setEditedItemId] = useState<string | null>(null);
  const editedItem = items.find((item) => item.id === editedItemId) ?? null;

  const onEditItem = (id: string) => {
    setEditedItemId(id);
    onOpen();
  };

  const handleClose = () => {
    setEditedItemId(null);
    onClose();
  };

  const onSave = (input: BudgetItemInput) => {
    if (editedItemId !== null) {
      onUpdate(editedItemId, input);
    } else {
      onAdd(input);
    }
  };

  const handleDeleteItem = () => {
    if (editedItemId === null) return;
    onDelete(editedItemId);
  };

  return {
    isOpen,
    editedItem,
    onEditItem,
    onOpen,
    onClose: handleClose,
    onSave,
    onDelete: handleDeleteItem,
  };
}
