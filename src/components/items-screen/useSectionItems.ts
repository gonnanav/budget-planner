import { useDisclosure } from "@heroui/react";
import { Item, ItemInput } from "@/core/types";

interface UseSectionItemsProps {
  selectedItemId?: string;
  onAddItem: (input: ItemInput) => Promise<string>;
  onUpdateItem: (id: string, input: ItemInput) => Promise<boolean>;
  onDeleteItem: (id: string) => Promise<void>;
  onChangeItemInput: (item: Item) => void;
  onResetItemInput: () => void;
}

export function useSectionItems({
  selectedItemId,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onChangeItemInput,
  onResetItemInput,
}: UseSectionItemsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddItemClick = () => {
    onResetItemInput();
    onOpen();
  };

  const handleItemClick = (item: Item) => {
    onChangeItemInput(item);
    onOpen();
  };

  const handleUpdateItem = async (input: ItemInput) => {
    if (!selectedItemId) return;

    await onUpdateItem(selectedItemId, input);
    onClose();
  };

  const handleAddItem = async (input: ItemInput) => {
    await onAddItem(input);
    onClose();
  };

  const handleSaveItemClick = selectedItemId ? handleUpdateItem : handleAddItem;

  const handleDeleteItemClick = async () => {
    if (!selectedItemId) return;

    await onDeleteItem(selectedItemId);
    onClose();
  };

  const itemDrawerHeading = selectedItemId ? "Edit Item" : "Add Item";

  return {
    isItemDrawerOpen: isOpen,
    itemDrawerHeading,
    handleAddItemClick,
    handleItemClick,
    handleSaveItemClick,
    handleDeleteItemClick: selectedItemId ? handleDeleteItemClick : undefined,
    handleCloseItemDrawer: onClose,
  };
}
