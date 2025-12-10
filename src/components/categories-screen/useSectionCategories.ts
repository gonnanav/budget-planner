import { useDisclosure } from "@heroui/react";
import { Category } from "@/core/types";
import { CategoryDraft } from "@/components/shared/types";

interface UseSectionCategoriesProps {
  onAddCategory: (name: string) => Promise<string>;
  onUpdateCategory: (id: string, name: string) => Promise<boolean>;
  onDeleteCategory: (id: string) => Promise<void>;
  onChangeCategoryInput: (category: Category) => void;
  onResetCategoryInput: () => void;
}

export function useSectionCategories({
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  onChangeCategoryInput,
  onResetCategoryInput,
}: UseSectionCategoriesProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddCategoryClick = () => {
    onResetCategoryInput();
    onOpen();
  };

  const handleCategoryClick = (category: Category) => {
    onChangeCategoryInput(category);
    onOpen();
  };

  const handleSaveCategoryClick = async ({ id, name }: CategoryDraft) => {
    if (id) {
      await onUpdateCategory(id, name);
    } else {
      await onAddCategory(name);
    }

    onClose();
  };

  const handleDeleteCategoryClick = async (id?: string) => {
    if (!id) return;

    await onDeleteCategory(id);
    onClose();
  };

  return {
    isCategoryDrawerOpen: isOpen,
    handleAddCategoryClick,
    handleCategoryClick,
    handleSaveCategoryClick,
    handleDeleteCategoryClick,
    handleCloseCategoryDrawer: onClose,
  };
}
