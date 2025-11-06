import { addToast } from "@heroui/react";
import { Category } from "@/core/types";
import { CategoryDrawerProps } from "@/components/category-drawer";

interface CategoryActionsProps {
  categories: Category[];
  isAtLimit: boolean;
  onAddCategory: (name: string) => void;
  onUpdateCategory: (id: string, name: string) => void;
  onDeleteCategory: (id: string) => void;
  onOpenCategoryDrawer: (props: Omit<CategoryDrawerProps, "isOpen">) => void;
  onCloseCategoryDrawer: () => void;
}

export function categoryActions({
  categories,
  isAtLimit,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  onOpenCategoryDrawer,
  onCloseCategoryDrawer,
}: CategoryActionsProps) {
  const handleOpenCategoryDrawer = ({
    category,
    onSave,
    onDelete,
  }: Omit<CategoryDrawerProps, "isOpen" | "onCancel" | "onClose">) => {
    onOpenCategoryDrawer({
      category,
      onSave: (name) => {
        onSave(name);
        onCloseCategoryDrawer();
      },
      onDelete:
        onDelete &&
        (() => {
          onDelete();
          onCloseCategoryDrawer();
        }),
      onCancel: onCloseCategoryDrawer,
      onClose: onCloseCategoryDrawer,
    });
  };

  const handleClickAddCategory = () => {
    if (isAtLimit) {
      addToast({
        title: "Limit reached",
        description: "You've reached the maximum number of income categories.",
        color: "warning",
      });
      return;
    }
    handleOpenCategoryDrawer({
      category: null,
      onSave: onAddCategory,
    });
  };

  const handleClickCategory = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    handleOpenCategoryDrawer({
      category,
      onSave: (name: string) => onUpdateCategory(categoryId, name),
      onDelete: () => onDeleteCategory(categoryId),
    });
  };

  return {
    onClickAddCategory: handleClickAddCategory,
    onClickCategory: handleClickCategory,
  };
}
