import { useDisclosure } from "@heroui/react";
import { Category } from "@/core/types";
import { CategoryDraft } from "@/components/shared/types";

interface UseSectionCategoriesProps {
  selectedCategoryId?: string;
  onAddCategory: (name: string) => Promise<string>;
  onUpdateCategory: (id: string, name: string) => Promise<boolean>;
  onDeleteCategory: (id: string) => Promise<void>;
  onChangeCategoryInput: (category: Category) => void;
  onResetCategoryInput: () => void;
}

export function useSectionCategories({
  selectedCategoryId,
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

  const handleUpdateCategory = async ({ name }: CategoryDraft) => {
    if (!selectedCategoryId) return;

    await onUpdateCategory(selectedCategoryId, name);
    onClose();
  };

  const handleAddCategory = async ({ name }: CategoryDraft) => {
    await onAddCategory(name);
    onClose();
  };

  const handleSaveCategoryClick = selectedCategoryId
    ? handleUpdateCategory
    : handleAddCategory;

  const handleDeleteCategoryClick = selectedCategoryId
    ? async () => {
        await onDeleteCategory(selectedCategoryId);
        onClose();
      }
    : undefined;

  const categoryDrawerHeading = selectedCategoryId
    ? "Edit Category"
    : "Add Category";

  return {
    isCategoryDrawerOpen: isOpen,
    categoryDrawerHeading,
    handleAddCategoryClick,
    handleCategoryClick,
    handleSaveCategoryClick,
    handleDeleteCategoryClick,
    handleCloseCategoryDrawer: onClose,
  };
}
