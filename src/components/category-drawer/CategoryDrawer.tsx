import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";
import { Category } from "@/core/types";
import { ActionButtons } from "@/components/action-buttons";
import { CategoryNameInput } from "./CategoryNameInput";

export interface CategoryDrawerProps {
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
            <ActionButtons onCancel={onCancel} onDelete={onDelete} />
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
