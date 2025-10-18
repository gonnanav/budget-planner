import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";
import { Button } from "@heroui/button";
import { Trash2 } from "lucide-react";
import { Category } from "@/core/types";
import { CategoryNameInput } from "./CategoryNameInput";

interface CategoryDrawerProps {
  isOpen: boolean;
  category?: Category | null;
  onCancel: () => void;
  onSave: (name: string) => void;
  onClose: () => void;
  onDelete?: () => void;
}

export const CategoryDrawer = ({
  isOpen,
  category,
  onCancel,
  onSave,
  onClose,
  onDelete,
}: CategoryDrawerProps) => {
  const [name, setName] = useState("");

  const isEditMode = Boolean(category);
  const title = isEditMode ? "Edit Category" : "Add Category";

  useEffect(() => {
    if (!category) {
      reset();
    } else {
      setName(category.name);
    }
  }, [category]);

  const reset = () => {
    setName("");
  };

  const handleCancel = () => {
    onCancel();
    reset();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(name);
    reset();
  };

  return (
    <Drawer isOpen={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <form onSubmit={handleSubmit}>
          <DrawerHeader>{title}</DrawerHeader>
          <DrawerBody>
            <CategoryNameInput name={name} onChange={setName} />
          </DrawerBody>
          <DrawerFooter>
            <Button color="danger" variant="light" onPress={handleCancel}>
              Cancel
            </Button>
            {isEditMode && (
              <Button
                color="danger"
                onPress={onDelete}
                isIconOnly
                aria-label="Delete"
              >
                <Trash2 size={16} />
              </Button>
            )}
            <Button color="primary" type="submit">
              Save
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
