import { useState } from "react";
import { useDisclosure } from "@heroui/react";
import { Item, ItemInput } from "@/core/types";

interface UseSectionItemsProps {
  onAddItem: (input: ItemInput) => Promise<string>;
  onUpdateItem: (id: string, input: ItemInput) => Promise<boolean>;
  onDeleteItem: (id: string) => Promise<void>;
  onChangeItemInput: (item: Item) => void;
  onResetItemInput: () => void;
}

export function useSectionItems({
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onChangeItemInput,
  onResetItemInput,
}: UseSectionItemsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleAddItemClick = () => {
    setSelectedItem(null);
    onResetItemInput();
    onOpen();
  };

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    onChangeItemInput(item);
    onOpen();
  };

  const handleUpdateItem = async (input: ItemInput) => {
    if (!selectedItem) return;

    await onUpdateItem(selectedItem.id, input);
    onClose();
  };

  const handleAddItem = async (input: ItemInput) => {
    await onAddItem(input);
    onClose();
  };

  const handleSaveItemClick = selectedItem ? handleUpdateItem : handleAddItem;

  const handleDeleteItemClick = async () => {
    if (!selectedItem) return;

    await onDeleteItem(selectedItem.id);
    onClose();
  };

  const itemDrawerHeading = selectedItem ? "Edit Item" : "Add Item";

  return {
    isItemDrawerOpen: isOpen,
    selectedItem,
    itemDrawerHeading,
    handleAddItemClick,
    handleItemClick,
    handleSaveItemClick,
    handleDeleteItemClick: selectedItem ? handleDeleteItemClick : undefined,
    handleCloseItemDrawer: onClose,
  };
}
