import { useState } from "react";
import { useDisclosure } from "@heroui/react";
import { CategoryDrawerProps } from "./CategoryDrawer";

type UseCategoryDrawerReturn = {
  categoryDrawerProps: CategoryDrawerProps;
  onOpenCategoryDrawer: (props: Omit<CategoryDrawerProps, "isOpen">) => void;
  onCloseCategoryDrawer: () => void;
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
    onOpenCategoryDrawer: openDrawer,
    onCloseCategoryDrawer: onClose,
  };
}
