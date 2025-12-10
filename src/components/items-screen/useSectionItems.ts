import { useDisclosure } from "@heroui/react";
import { Item, ItemInput } from "@/core/types";
import { ItemDraft } from "@/components/shared/types";

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

  const handleAddItemClick = () => {
    onResetItemInput();
    onOpen();
  };

  const handleItemClick = (item: Item) => {
    onChangeItemInput(item);
    onOpen();
  };

  const handleSaveItemClick = async (draft: ItemDraft) => {
    if (draft.id) {
      await onUpdateItem(draft.id, draft);
    } else {
      await onAddItem(draft);
    }

    onClose();
  };

  const handleDeleteItemClick = async (id?: string) => {
    if (!id) return;

    await onDeleteItem(id);
    onClose();
  };

  return {
    isItemDrawerOpen: isOpen,
    handleAddItemClick,
    handleItemClick,
    handleSaveItemClick,
    handleDeleteItemClick,
    handleCloseItemDrawer: onClose,
  };
}
