import { ItemDrawerProps } from "@/components/item-drawer/ItemDrawer";
import { BudgetItem, BudgetItemInput, Category } from "@/core/types";

interface ItemActionsProps {
  items: BudgetItem[];
  categories: Category[];
  onAddItem: (input: BudgetItemInput) => void;
  onUpdateItem: (id: string, input: BudgetItemInput) => void;
  onDeleteItem: (id: string) => void;
  onOpenItemDrawer: (props: Omit<ItemDrawerProps, "isOpen">) => void;
  onCloseItemDrawer: () => void;
}

export function itemActions({
  items,
  categories,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onOpenItemDrawer,
  onCloseItemDrawer,
}: ItemActionsProps) {
  const handleOpenItemDrawer = ({
    item,
    categories,
    onSave,
    onDelete,
  }: Omit<ItemDrawerProps, "isOpen" | "onCancel" | "onClose">) => {
    onOpenItemDrawer({
      item,
      categories,
      onSave: (input) => {
        onSave(input);
        onCloseItemDrawer();
      },
      onDelete:
        onDelete &&
        (() => {
          onDelete();
          onCloseItemDrawer();
        }),
      onCancel: onCloseItemDrawer,
      onClose: onCloseItemDrawer,
    });
  };

  const handleClickAddItem = () => {
    handleOpenItemDrawer({
      item: null,
      categories,
      onSave: onAddItem,
    });
  };

  const handleClickItem = (id: string) => {
    const item = items.find((item) => item.id === id);
    handleOpenItemDrawer({
      item,
      categories,
      onSave: (input) => onUpdateItem(id, input),
      onDelete: () => onDeleteItem(id),
    });
  };

  return {
    onClickAddItem: handleClickAddItem,
    onClickItem: handleClickItem,
  };
}
