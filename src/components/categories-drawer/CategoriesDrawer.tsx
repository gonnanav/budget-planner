import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@heroui/drawer";
import type { Category } from "@/core/types";
import { CategoriesContent } from "./CategoriesContent";

interface CategoriesDrawerProps {
  isOpen: boolean;
  categories: Category[];
  isLoading: boolean;
  onClose: () => void;
  onAddCategory: (name: string) => void;
  onChangeCategory: (id: string, newName: string) => void;
  onDeleteCategory: (id: string) => void;
}

export const CategoriesDrawer = ({
  isOpen,
  categories,
  isLoading,
  onClose,
  onAddCategory,
  onChangeCategory,
  onDeleteCategory,
}: CategoriesDrawerProps) => {
  return (
    <Drawer isOpen={isOpen} onOpenChange={onClose} placement="left">
      <DrawerContent>
        <DrawerHeader>
          <h3 className="text-lg font-semibold">Categories</h3>
        </DrawerHeader>
        <DrawerBody>
          <CategoriesContent
            categories={categories}
            isLoading={isLoading}
            onAddCategory={onAddCategory}
            onChangeCategory={onChangeCategory}
            onDeleteCategory={onDeleteCategory}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
