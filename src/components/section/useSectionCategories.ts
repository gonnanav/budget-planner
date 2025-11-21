import { useState } from "react";
import { useDisclosure } from "@heroui/react";
import { Category } from "@/core/types";

interface UseSectionCategoriesProps {
  onAddCategory: (name: string) => Promise<string>;
  onUpdateCategory: (id: string, name: string) => Promise<boolean>;
  onDeleteCategory: (id: string) => Promise<void>;
}

export function useSectionCategories({
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
}: UseSectionCategoriesProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const handleAddCategoryClick = () => {
    setSelectedCategory(null);
    onOpen();
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    onOpen();
  };

  const handleUpdateCategory = async (name: string) => {
    if (!selectedCategory) return;

    await onUpdateCategory(selectedCategory.id, name);
    onClose();
  };

  const handleAddCategory = async (name: string) => {
    await onAddCategory(name);
    onClose();
  };

  const handleSaveCategoryClick = selectedCategory
    ? handleUpdateCategory
    : handleAddCategory;

  const handleDeleteCategoryClick = async () => {
    if (!selectedCategory) return;

    await onDeleteCategory(selectedCategory.id);
    onClose();
  };

  return {
    isCategoryDrawerOpen: isOpen,
    selectedCategory,
    handleAddCategoryClick,
    handleCategoryClick,
    handleSaveCategoryClick,
    handleDeleteCategoryClick,
    handleCloseCategoryDrawer: onClose,
  };
}
