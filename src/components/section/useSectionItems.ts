import { useState } from "react";
import { useDisclosure } from "@heroui/react";
import { BudgetItem, BudgetItemInput } from "@/core/types";

interface UseSectionItemsProps {
  onAddItem: (input: BudgetItemInput) => Promise<string>;
  onUpdateItem: (id: string, input: BudgetItemInput) => Promise<boolean>;
  onDeleteItem: (id: string) => Promise<void>;
}

export function useSectionItems({
  onAddItem,
  onUpdateItem,
  onDeleteItem,
}: UseSectionItemsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState<BudgetItem | null>(null);

  const handleAddItemClick = () => {
    setSelectedItem(null);
    onOpen();
  };

  const handleItemClick = (item: BudgetItem) => {
    setSelectedItem(item);
    onOpen();
  };

  const handleUpdateItem = async (input: BudgetItemInput) => {
    if (!selectedItem) return;

    await onUpdateItem(selectedItem.id, input);
    onClose();
  };

  const handleAddItem = async (input: BudgetItemInput) => {
    await onAddItem(input);
    onClose();
  };

  const handleSaveItemClick = selectedItem ? handleUpdateItem : handleAddItem;

  const handleDeleteItemClick = async () => {
    if (!selectedItem) return;

    await onDeleteItem(selectedItem.id);
    onClose();
  };

  return {
    isItemDrawerOpen: isOpen,
    selectedItem,
    handleAddItemClick,
    handleItemClick,
    handleSaveItemClick,
    handleDeleteItemClick,
    handleCloseItemDrawer: onClose,
  };
}
