import { useState } from "react";
import { useDisclosure } from "@heroui/react";
import { ItemDrawerProps } from "./ItemDrawer";

type UseItemDrawerReturn = {
  itemDrawerProps: ItemDrawerProps;
  openItemDrawer: (props: Omit<ItemDrawerProps, "isOpen">) => void;
  closeItemDrawer: () => void;
};

export function useItemDrawer(): UseItemDrawerReturn {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [props, setProps] = useState<Omit<ItemDrawerProps, "isOpen">>({
    item: null,
    categories: [],
    onCancel: () => {},
    onSave: () => {},
    onClose: () => {},
  });

  const openDrawer = (props: Omit<ItemDrawerProps, "isOpen">) => {
    setProps(props);
    onOpen();
  };

  return {
    itemDrawerProps: { ...props, isOpen },
    openItemDrawer: openDrawer,
    closeItemDrawer: onClose,
  };
}
