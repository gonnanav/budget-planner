import { useState } from "react";
import type { Category } from "@/core/types";
import { CategoriesLoading } from "./CategoriesLoading";
import { AddCategoryButton } from "./AddCategoryButton";
import { CategoryEditForm } from "./CategoryEditForm";
import { CategoryRow } from "./CategoryRow";

interface CategoriesContentProps {
  categories: Category[];
  isLoading: boolean;
  initialEditedCategoryId?: string;
  onAddCategory: (name: string) => void;
  onChangeCategory: (id: string, newName: string) => void;
  onDeleteCategory: (id: string) => void;
}

export const CategoriesContent = ({
  categories,
  isLoading,
  initialEditedCategoryId,
  onAddCategory,
  onChangeCategory,
  onDeleteCategory,
}: CategoriesContentProps) => {
  const [editedCategoryId, setEditedCategoryId] = useState<string | null>(
    initialEditedCategoryId ?? null,
  );
  const [isEditing, setIsEditing] = useState(false);
  const isAddingNew = isEditing && editedCategoryId === null;

  const showEmpty = !isLoading && categories.length === 0 && !isAddingNew;

  const reset = () => {
    setIsEditing(false);
    setEditedCategoryId(null);
  };

  const handleAddNew = () => {
    setEditedCategoryId(null);
    setIsEditing(true);
  };

  const handleSaveNew = (categoryName: string) => {
    onAddCategory(categoryName);
    setIsEditing(false);
  };

  const handleCancelNew = () => {
    reset();
  };

  const handleCategoryClick = (category: Category) => {
    setEditedCategoryId(category.id);
    setIsEditing(true);
  };

  const handleCancelEdited = () => {
    reset();
  };

  const handleSaveEdited = (categoryName: string) => {
    if (!editedCategoryId) return;

    onChangeCategory(editedCategoryId, categoryName);
    reset();
  };

  const handleDelete = () => {
    if (!editedCategoryId) return;

    onDeleteCategory(editedCategoryId);
    reset();
  };

  return (
    <div className="flex flex-col gap-4">
      <AddCategoryButton isDisabled={isLoading} onAdd={handleAddNew} />
      <div className="flex flex-col gap-1">
        {isAddingNew && (
          <CategoryEditForm onSave={handleSaveNew} onCancel={handleCancelNew} />
        )}
        {showEmpty ? (
          <p className="text-sm text-center text-gray-400">No categories yet</p>
        ) : isLoading ? (
          <CategoriesLoading />
        ) : (
          categories.map((category) => (
            <div key={category.id}>
              {editedCategoryId === category.id ? (
                <CategoryEditForm
                  initialValue={category.name}
                  onSave={handleSaveEdited}
                  onCancel={handleCancelEdited}
                  onDelete={handleDelete}
                />
              ) : (
                <CategoryRow
                  category={category}
                  onClick={handleCategoryClick}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
