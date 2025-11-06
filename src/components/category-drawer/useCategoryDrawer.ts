import { useState } from "react";
import { useDisclosure } from "@heroui/react";
import { CategoryDrawerProps } from "./CategoryDrawer";

type UseCategoryDrawerReturn = {
  categoryDrawerProps: CategoryDrawerProps;
  openCategoryDrawer: (props: Omit<CategoryDrawerProps, "isOpen">) => void;
  closeCategoryDrawer: () => void;
};

export function useCategoryDrawer(): UseCategoryDrawerReturn {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [props, setProps] = useState<Omit<CategoryDrawerProps, "isOpen">>({
    category: null,
    onCancel: () => {},
    onSave: () => {},
    onClose: () => {},
  });

  const openDrawer = (props: Omit<CategoryDrawerProps, "isOpen">) => {
    setProps(props);
    onOpen();
  };

  return {
    categoryDrawerProps: { ...props, isOpen },
    openCategoryDrawer: openDrawer,
    closeCategoryDrawer: onClose,
  };
}
