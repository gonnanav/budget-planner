import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@heroui/drawer";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Trash2, Plus } from "lucide-react";
import type { Category } from "@/core/types";
import { CategoriesLoading } from "./CategoriesLoading";

interface CategoriesDrawerProps {
  isOpen: boolean;
  categories: Category[] | null;
  initialEditedCategoryId?: string;
  onClose: () => void;
  onAddCategory: (name: string) => void;
  onChangeCategory: (id: string, newName: string) => void;
  onDeleteCategory: (id: string) => void;
}

export const CategoriesDrawer = ({
  isOpen,
  categories,
  initialEditedCategoryId,
  onClose,
  onAddCategory,
  onChangeCategory,
  onDeleteCategory,
}: CategoriesDrawerProps) => {
  const [editingId, setEditingId] = useState<string | null>(
    initialEditedCategoryId ?? null,
  );
  const [editingName, setEditingName] = useState(() =>
    initialEditedCategoryId && categories
      ? (categories.find((c) => c.id === initialEditedCategoryId)?.name ?? "")
      : "",
  );
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleCategoryClick = (category: Category) => {
    setEditingId(category.id);
    setEditingName(category.name);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingName("");
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingId(null);
    setEditingName("");
  };

  const handleSave = () => {
    if (isAddingNew && editingName.trim()) {
      onAddCategory(editingName.trim());
    } else if (editingId && editingName.trim()) {
      onChangeCategory(editingId, editingName.trim());
    }
    setEditingId(null);
    setEditingName("");
    setIsAddingNew(false);
  };

  const handleDelete = () => {
    if (editingId) {
      onDeleteCategory(editingId);
      setEditingId(null);
      setEditingName("");
    }
  };

  return (
    <Drawer isOpen={isOpen} onOpenChange={onClose} placement="left">
      <DrawerContent>
        <DrawerHeader>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-lg font-semibold">Categories</h3>
            <Button
              size="sm"
              color="primary"
              onPress={handleAddNew}
              isIconOnly
              aria-label="Add category"
            >
              <Plus size={16} />
            </Button>
          </div>
        </DrawerHeader>
        <DrawerBody>
          {categories === null ? (
            <CategoriesLoading />
          ) : (
            <div className="flex flex-col gap-2">
              {isAddingNew && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-300">
                  <div className="flex flex-col gap-4">
                    <Input
                      label="Name"
                      value={editingName}
                      onValueChange={(value) => setEditingName(value)}
                      autoFocus
                      placeholder="Enter category name"
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          color="danger"
                          variant="light"
                          onPress={handleCancel}
                        >
                          Cancel
                        </Button>
                        <Button size="sm" color="primary" onPress={handleSave}>
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {categories.length === 0 && !isAddingNew ? (
                <p className="text-sm text-center text-gray-400">
                  No categories yet
                </p>
              ) : (
                categories.map((category) => (
                  <div key={category.id}>
                    {editingId === category.id ? (
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-300">
                        <div className="flex flex-col gap-4">
                          <Input
                            label="Name"
                            value={editingName}
                            onValueChange={(value) => setEditingName(value)}
                            autoFocus
                          />
                          <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                color="danger"
                                variant="light"
                                onPress={handleCancel}
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                color="primary"
                                onPress={handleSave}
                              >
                                Save
                              </Button>
                            </div>
                            <Button
                              size="sm"
                              color="danger"
                              onPress={handleDelete}
                              isIconOnly
                              aria-label="Delete"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="p-4 bg-gray-50 hover:bg-gray-200 rounded-lg border border-gray-300 transition-colors duration-150 cursor-pointer"
                        onClick={() => handleCategoryClick(category)}
                      >
                        <span className="font-medium text-gray-800">
                          {category.name}
                        </span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
