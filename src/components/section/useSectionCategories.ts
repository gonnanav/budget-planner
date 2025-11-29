import { useState } from "react";
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
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const handleAddCategoryClick = () => {
    setSelectedCategory(null);
    onResetCategoryInput();
    onOpen();
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    onChangeCategoryInput(category);
    onOpen();
  };

  const handleUpdateCategory = async ({ name }: CategoryDraft) => {
    if (!selectedCategory) return;

    await onUpdateCategory(selectedCategory.id, name);
    onClose();
  };

  const handleAddCategory = async ({ name }: CategoryDraft) => {
    await onAddCategory(name);
    onClose();
  };

  const handleSaveCategoryClick = selectedCategory
    ? handleUpdateCategory
    : handleAddCategory;

  const handleDeleteCategoryClick = selectedCategory
    ? async () => {
        await onDeleteCategory(selectedCategory.id);
        onClose();
      }
    : undefined;

  const categoryDrawerHeading = selectedCategory
    ? "Edit Category"
    : "Add Category";

  return {
    isCategoryDrawerOpen: isOpen,
    selectedCategory,
    categoryDrawerHeading,
    handleAddCategoryClick,
    handleCategoryClick,
    handleSaveCategoryClick,
    handleDeleteCategoryClick,
    handleCloseCategoryDrawer: onClose,
  };
}
